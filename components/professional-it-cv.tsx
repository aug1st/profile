/**
 * Professional IT CV Component
 * 
 * A comprehensive curriculum vitae component that showcases professional experience,
 * skills, and certifications in the IT field. Features include:
 * - Dark/light mode toggle
 * - Interactive job experience sections
 * - Animated typing effect for the headline
 * - Certification tooltips
 * - Copy protection
 * - Responsive design
 * 
 * @component
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  Code, 
  Database, 
  GraduationCap, 
  Linkedin, 
  Mail, 
  Moon, 
  Phone, 
  Server, 
  Shield, 
  Sun, 
  User,  
  X 
} from 'lucide-react'
import { supabase } from '../lib/supabase'

// Types and Interfaces
interface VisitorLog {
  ip: string;
  timestamp: string;
  os: string;
  browser: string;
}

interface ExpandedJobs {
  hafniaIT: boolean;
  hafniaFS: boolean;
  axa: boolean;
  worldKitchen: boolean;
  veolia: boolean;
}

type JobKey = keyof ExpandedJobs;

export function ProfessionalItCv() {
  // Theme state management
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const logVisitorInfo = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Get IP address with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const ipResponse = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!ipResponse.ok) {
        throw new Error('Failed to fetch IP');
      }
      
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      
      // Get browser and OS info
      const userAgent = window.navigator.userAgent;
      const browser = detectBrowser(userAgent);
      const os = detectOS(userAgent);
      
      // Create visitor log
      const visitorLog: VisitorLog = {
        ip,
        timestamp: new Date().toISOString(),
        os,
        browser
      };

      // Store in Supabase with retry logic
      let retries = 3;
      while (retries > 0) {
        try {
          const { data, error } = await supabase
            .from('visitor_logs')
            .insert([visitorLog])
            .select();

          if (error) throw error;
          console.log('Successfully logged visitor:', data);
          break;
        } catch (error) {
          retries--;
          if (retries === 0) {
            console.error('Failed to store visitor info after all retries:', error);
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request timed out');
      } else {
        console.error('Failed to log visitor info:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Helper functions to detect browser and OS
  const detectBrowser = (userAgent: string): string => {
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    if (userAgent.includes('Opera')) return 'Opera'
    return 'Unknown'
  }

  const detectOS = (userAgent: string): string => {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }

  // Log visitor info on component mount
  useEffect(() => {
    logVisitorInfo()
  }, [logVisitorInfo])

  /**
   * Typewriter effect state and configuration
   * Animates the headline text character by character
   */
  const [text, setText] = useState('')
  const fullText = 'Driving Innovation and Security in IT Operations'
  const typingSpeed = 100 // milliseconds per character

  // Initialize typewriter effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [])

  /**
   * Job experience section expansion state
   * Tracks which sections are expanded/collapsed
   */
  const [expandedJobs, setExpandedJobs] = useState<ExpandedJobs>({
    hafniaIT: false,
    hafniaFS: false,
    axa: false,
    worldKitchen: false,
    veolia: false
  })

  /**
   * Toggles between dark and light mode
   * Updates the theme state and applies appropriate styling
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  /**
   * Toggles the expansion state of a specific job section
   * @param jobKey - Identifier for the job section to toggle
   */
  const toggleJob = (jobKey: JobKey) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobKey]: !prev[jobKey]
    }))
  }

  /**
   * Content protection features
   * Prevents unauthorized copying and manipulation of content
   */
  
  // Prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    alert('Oops! No right-clicking here—gotta keep the content safe and sound!')
  }

  // Prevent keyboard shortcuts for copying/saving
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'c':
        case 'x':
        case 'u':
        case 'i':
        case 's':
        case 'p':
          e.preventDefault()
          alert('Nice try, but no keyboard wizardry allowed—gotta keep this content secure!')
          break
      }
    }
  }

  // Prevent text selection
  const handleSelect = (e: Event) => {
    e.preventDefault()
  }

  // Set up text selection prevention
  useEffect(() => {
    document.addEventListener('selectstart', handleSelect)
    return () => {
      document.removeEventListener('selectstart', handleSelect)
    }
  }, [])

  // Personal information
  const name = 'Calvin Wong'

  /**
   * Modal states for additional information sections
   * Controls visibility of infrastructure and compliance details
   */
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showComplianceModal, setShowComplianceModal] = useState(false)

  return (
    <div 
      className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Makes the div focusable for keyboard events
    >
      {/* Main container with responsive padding */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {/* CV Card with dark/light mode styling */}
        <div className={`max-w-5xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
          
          {/* Header Section with gradient background and contact information */}
          <header className={`px-8 py-12 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-blue-900 to-blue-700'} rounded-t-lg relative overflow-hidden`}>
            {/* Decorative dot pattern background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}></div>
            </div>
            
            {/* Header content with name and animated tagline */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-blue-400 opacity-50 rounded-full"></div>
                <h1 className="text-5xl font-bold text-white tracking-tight mb-2">{name}</h1>
                <p className="text-xl text-blue-100 font-light tracking-wide relative">
                  {text}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              
              <div className="mt-6 md:mt-0 space-y-3 relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-blue-400 opacity-50 rounded-full md:hidden"></div>
                <div className="flex items-center text-blue-50 hover:text-white transition-colors group">
                  <div className="p-2 rounded-full bg-blue-800/30 group-hover:bg-blue-700/50 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <a href="mailto:cw@aug1st.com" className="ml-3 hover:text-white transition-colors">cw at aug1st dot com</a>
                </div>
                <div className="flex items-center text-blue-50 hover:text-white transition-colors group">
                  <div className="p-2 rounded-full bg-blue-800/30 group-hover:bg-blue-700/50 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <a href="https://wa.me/+6588005130" className="ml-3 hover:text-white transition-colors">+65 88OO 531O</a>
                </div>
                <div className="flex items-center text-blue-50 hover:text-white transition-colors group">
                  <div className="p-2 rounded-full bg-blue-800/30 group-hover:bg-blue-700/50 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <a href="https://www.linkedin.com/in/yfcw/" className="ml-3 hover:text-white transition-colors">LinkedIn Profile</a>
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="px-8 py-10">
            {/* Professional Summary Section */}
            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <User className="h-6 w-6 mr-3 text-blue-600" />
                Professional Summary
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                As an experienced IT leader and cybersecurity expert, I specialise in developing and implementing robust technical
                solutions that enhance business security and efficiency. My expertise spans cybersecurity risk management,
                technical design, and strategic project leadership. With a proven track record in IT governance, cloud infrastructure,
                and cybersecurity frameworks (ISO/IEC 27001, PCI-DSS), I drive seamless business operations while ensuring strong
                compliance with industry standards. Leveraging my in-depth technical knowledge and strong leadership abilities, I
                successfully navigate complex IT projects, security initiatives, and data centre operations to guarantee the seamless
                execution of business objectives.
              </p>
            </section>

            {/* Professional Experience Section with expandable job entries */}
            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                <div 
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => toggleJob('hafniaIT')}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>IT Manager</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Hafnia Pools Pte Ltd. | 06.2023 - Present</p>
                    </div>
                    <div className={`transform transition-transform ${expandedJobs.hafniaIT ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJobs.hafniaIT && (
                    <ul className={`mt-4 space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Established as the Primary Contact for MSBC:</strong> Became the main liaison for Microsoft Business Central, ensuring seamless coordination across the Finance function.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Achieved 99% System Uptime:</strong> Collaborated with internal teams and external vendors to maintain over 99% system availability across regional offices.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Led Critical Issue Resolutions:</strong> Spearheaded emergency responses to swiftly resolve critical system issues, minimizing downtime and ensuring uninterrupted services.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Drove Operational Excellence:</strong> Proactively monitored the helpdesk queue, ensuring prompt and efficient resolution of all incidents, requests, and problems.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Ensured Rigorous Documentation Standards:</strong> Established best practices for recording issues and resolutions within the helpdesk platform, enhancing knowledge management and compliance.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Demonstrated Leadership in Problem Solving:</strong> Maintained a proactive, solutions-oriented mindset, effectively resolving operational challenges impacting key business processes.</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div 
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => toggleJob('hafniaFS')}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Financial Systems Manager</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Hafnia Pools Pte Ltd. | 12.2019 - 05.2023</p>
                    </div>
                    <div className={`transform transition-transform ${expandedJobs.hafniaFS ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJobs.hafniaFS && (
                    <ul className={`mt-4 space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Ensured Seamless MSBC Operations:</strong> Oversaw MSBC operations to ensure a seamless interface with the finance ecosystem.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Provided Critical Support to Key Users:</strong> Delivered account management and troubleshooting support for key MSBC users.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Bridged Internal and External Collaboration:</strong> Acted as the primary liaison, aligning internal teams with external stakeholders.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Excelled in Problem-Solving and Critical Thinking:</strong> Resolved complex MSBC technical issues with strong analytical skills.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Led Compliance and Security Audits:</strong> Coordinated audits to maintain high standards of security, compliance, and functionality for MSBC.</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div 
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => toggleJob('axa')}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>IT Manager</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>AXA Partners Singapore | 11.2014 - 09.2019</p>
                    </div>
                    <div className={`transform transition-transform ${expandedJobs.axa ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJobs.axa && (
                    <ul className={`mt-4 space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Optimized IT Operations with Strategic Policies:</strong> Implemented IT policies that reduced system errors by 20%, enhancing operational efficiency.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Ensured Full Compliance with Security Standards:</strong> Achieved compliance with PCI-DSS, OSPAR, and MAS TRM, safeguarding the organization's digital infrastructure.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Spearheaded Regional IT Initiatives:</strong> Led regional efforts to strengthen digital infrastructure, achieving 100% audit compliance and reinforcing operational integrity.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Strengthened IT Frameworks with Robust Security Measures:</strong> Integrated compliance components into IT frameworks to establish resilient security systems protecting digital assets.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Aligned Infrastructure with Industry Standards:</strong> Collaboratively elevated infrastructure to meet AXA group's rigorous standards, demonstrating strategic governance and execution.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Applied Strategic Knowledge in Impactful Ways:</strong> Leveraged strategic understanding to implement solutions delivering sustainable improvements to IT systems.</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div 
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => toggleJob('worldKitchen')}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>IT Manager, Asia Pacific</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>World Kitchen (Asia Pacific) | 01.2011 - 05.2014</p>
                    </div>
                    <div className={`transform transition-transform ${expandedJobs.worldKitchen ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJobs.worldKitchen && (
                    <ul className={`mt-4 space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Led IT Operations Across the Asia-Pacific Region:</strong> Directed system integration, security, and network infrastructure, achieving 99.5% system availability across regional offices.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Managed a High-Performing IT Team:</strong> Supervised a diverse team of six IT professionals, consistently delivering projects on time and within budget.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Enhanced Team Productivity by 15%:</strong> Implemented process improvements and fostered collaboration, resulting in a 15% increase in team productivity.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Ensured Operational Excellence and Accountability:</strong> Maintained rigorous reporting standards and ensured efficient task completion, aligning team efforts with departmental goals.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Upheld Strategic Focus on Excellence:</strong> Consistently delivered results that upheld the department's commitment to excellence.</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div 
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => toggleJob('veolia')}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>IT Manager, SEA</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Veolia Water (SEA) Holding | 09.2006 - 08.2010</p>
                    </div>
                    <div className={`transform transition-transform ${expandedJobs.veolia ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJobs.veolia && (
                    <ul className={`mt-4 space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Led a High-Performing IT Team:</strong> Managed a skilled IT team to maintain network and system availability, ensuring seamless business operations.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Ensured Operational Efficiency and Reliability:</strong> Proactively upheld efficiency and reliability in IT operations to support organisational goals.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Managed Vendors and Internal Clients Effectively:</strong> Coordinated with vendors and internal clients to ensure smooth service delivery and alignment with business objectives.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Oversaw Critical IT Infrastructure Components:</strong> Managed essential IT infrastructure, including network connections, hardware procurement, and system application deployment.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span><strong className="text-blue-600 dark:text-blue-400">Achieved IT Objectives to Support Business Success:</strong> Ensured smooth IT system operations to drive organisational success and efficiency.</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <GraduationCap className="h-6 w-6 mr-3 text-blue-600" />
                Education
              </h2>
              <div className="space-y-4">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Master of Project and Programme Management</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>The University of Sydney | 2025</p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Focus: Strategic Thinking, Organisational Skills, Interpersonal and Leadership Skills
                  </p>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Master of Cyber Security</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>The University of Adelaide | 2023</p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grade: GPA 6.25/7</p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Focus: Cybersecurity, Data Privacy, Information Risk, Python Programming
                  </p>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Advanced Certificate in Practical Business Law</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>SMU Academy | 2022</p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Focus: Legal Principles, Risk Management, Decision-making, Strategic Contribution
                  </p>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Professional Certificate in Digital Marketing</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>SMU Academy | 2021</p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Focus: Social Media Marketing; Search Engine Marketing (SEM); Content Creation and Curation; Persuasive Copywriting
                  </p>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Graduate Diploma in Communication Management and Innovation</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>SMU Academy | 2020</p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Focus: Strategic Communication, Digital Marketing Proficiency, Innovation Management, Leadership and Persuasion
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Technical Skills */}
              <section>
                <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Award className="h-6 w-6 mr-3 text-blue-600" />
                  Certifications
                </h2>
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex group relative">
                      <span className="mr-2">•</span>
                      <span className="relative group-hover:text-red-500 transition-colors duration-200">
                        AWS Certified SysOps Administrator – Associate
                        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 hidden group-hover:block w-80 bg-blue-800 text-white text-sm rounded-lg p-4 shadow-lg z-10">
                          <div className="relative">
                            A certification validates skills in deploying, managing, and operating scalable and fault-tolerant systems on AWS. It focuses on monitoring, security, networking, automation, and operational best practices. Ideal for system administrators, it prepares candidates to manage AWS environments effectively and securely.
                          </div>
                        </div>
                      </span>
                    </li>
                    <li className="flex group relative">
                      <span className="mr-2">•</span>
                      <span className="relative group-hover:text-red-500 transition-colors duration-200">
                        AWS Certified Developer – Associate
                        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 hidden group-hover:block w-80 bg-blue-800 text-white text-sm rounded-lg p-4 shadow-lg z-10">
                          <div className="relative">
                            A certification validates proficiency in designing, developing, and deploying cloud-based applications on AWS. It focuses on core AWS services, application security, and troubleshooting. Ideal for developers, it equips candidates to build and optimise scalable, secure, and high-performing cloud applications.
                          </div>
                        </div>
                      </span>
                    </li>
                    <li className="flex group relative">
                      <span className="mr-2">•</span>
                      <span className="relative group-hover:text-red-500 transition-colors duration-200">
                        AWS Certified Solutions Architect – Associate
                        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 hidden group-hover:block w-80 bg-blue-800 text-white text-sm rounded-lg p-4 shadow-lg z-10">
                          <div className="relative">
                            A certification validates the ability to design and deploy scalable, cost-efficient, and reliable systems on AWS. It focuses on architectural best practices, security, and high availability. Ideal for solution architects, it equips candidates to create cloud solutions aligned with business requirements.
                          </div>
                        </div>
                      </span>
                    </li>
                    <li className="flex group relative">
                      <span className="mr-2">•</span>
                      <span className="relative group-hover:text-red-500 transition-colors duration-200">
                      Practitioner Certificate in Personal Data Protection (SG)
                        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 hidden group-hover:block w-80 bg-blue-800 text-white text-sm rounded-lg p-4 shadow-lg z-10">
                          <div className="relative">
                            This certificate equips Data Protection Officers and professionals with the knowledge and skills to implement and manage data protection programs under the PDPA. It covers key areas like risk management, breach response, and compliance. Certification is co-issued by the PDPC and IAPP, enhancing credibility and expertise in data governance.
                          </div>
                        </div>
                      </span>
                    </li>
                    <li className="flex group relative">
                      <span className="mr-2">•</span>
                      <span className="relative group-hover:text-red-500 transition-colors duration-200">
                        Lean Six Sigma (LSS) Yellow Belt Certification (2020)
                        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 hidden group-hover:block w-80 bg-blue-800 text-white text-sm rounded-lg p-4 shadow-lg z-10">
                          <div className="relative">
                            This focuses on foundational principles of Lean Six Sigma methodologies, equipping individuals to support process improvement projects. Participants learn to identify waste, improve efficiency, and assist in problem-solving under the guidance of Green or Black Belts. Ideal for team members, it enhances skills in basic quality tools and continuous improvement techniques.
                          </div>
                        </div>
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Certifications Section with interactive tooltips */}
              <section>
                <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  Trainings
                </h2>
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>ISO/IEC 27001:2022 ISMS Internal Auditor</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Data Analytics Using Power BI</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>NICF - Microsoft Azure Administrator</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>NICF - Certified Information Systems Auditor</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>ITIL v3 Foundation for IT Service Management</span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Technical Skills Section */}
            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Code className="h-6 w-6 mr-2 text-blue-600" />
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div 
                  className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setShowInfraModal(true)}
                  role="button"
                  tabIndex={0}
                >
                    <h3 className={`text-lg font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Server className="h-5 w-5 mr-2 text-blue-600" />
                    Infrastructure
                  </h3>
                  <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Cloud (AWS, Azure)</li>
                    <li>Virtualization</li>
                    <li>Network Architecture</li>
                  </ul>
                </div>

                {showInfraModal && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" 
                    onClick={() => setShowInfraModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="infra-modal-title"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setShowInfraModal(false);
                      }
                    }}
                    tabIndex={-1}
                  >
                    <div 
                      className={`max-w-2xl mx-auto p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
                      onClick={(e) => e.stopPropagation()}
                      role="document"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 id="infra-modal-title" className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Infrastructure Achievements</h2>
                        <button 
                          onClick={() => setShowInfraModal(false)}
                          className={`p-2 rounded-full hover:bg-gray-200 ${darkMode ? 'hover:bg-gray-700' : ''}`}
                          aria-label="Close modal"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Architected a multi-region AWS deployment to ensure high availability and 99.99% uptime for critical business applications.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Designed and implemented a cost optimisation strategy on Azure, reducing monthly cloud expenses by 25%.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Successfully migrated on-premises infrastructure to AWS, ensuring zero downtime during the transition.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Consolidated 20+ physical servers into virtualised environments, reducing hardware costs by 40%.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Designed and implemented a virtual desktop infrastructure (VDI) solution for a remote workforce, improving accessibility and security.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Conducted a comprehensive network security audit, implementing recommendations that reduced potential vulnerabilities by 50%.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-lg font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Database className="h-5 w-5 mr-2 text-blue-600" />
                    ERP & Database
                  </h3>
                  <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>MS Business Central</li>
                    <li>SQL</li>
                    <li>Backup & Recovery</li>
                  </ul>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                  <h3 className={`text-lg font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Code className="h-5 w-5 mr-2 text-blue-600" />
                    Web & App Coding
                  </h3>
                  <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Python</li>
                    <li>Swift</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setShowComplianceModal(true)}
                  role="button"
                  tabIndex={0}
                >
                  <h3 className={`text-lg font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Compliance
                  </h3>
                  <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>PCI-DSS</li>
                    <li>ISO/IEC 27001:2015</li>
                    <li>PDPA</li>
                  </ul>
                </div>

                {showComplianceModal && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" 
                    onClick={() => setShowComplianceModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="compliance-modal-title"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setShowComplianceModal(false);
                      }
                    }}
                    tabIndex={-1}
                  >
                    <div 
                      className={`max-w-2xl mx-auto p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
                      onClick={(e) => e.stopPropagation()}
                      role="document"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 id="compliance-modal-title" className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Compliance Achievements</h2>
                        <button 
                          onClick={() => setShowComplianceModal(false)}
                          className={`p-2 rounded-full hover:bg-gray-200 ${darkMode ? 'hover:bg-gray-700' : ''}`}
                          aria-label="Close modal"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Conducted organisation-wide PDPA training sessions, increasing employee compliance awareness by 95%.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Implemented an ISMS for a startup, achieving ISO/IEC 27001:2015 certification within nine months.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Conducted risk assessments that identified and mitigated 80% of critical information security risks.</span>
                        </li>
                        <li className="flex">
                          <span className="mr-2">•</span>
                          <span>Conducted quarterly vulnerability scans and penetration tests, maintaining a 100% compliance score over three audit cycles.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>

          {/* Footer with copyright and dark mode toggle */}
          <footer className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                &copy; {new Date().getFullYear()} {name}. All rights reserved.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last Update: 27.11.2024
              </p>
              <button
                onClick={toggleDarkMode}
                className={`fixed bottom-6 right-6 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg ${
                  darkMode
                    ? 'bg-gray-700 text-yellow-300 focus:ring-yellow-500 hover:bg-gray-600'
                    : 'bg-white text-gray-800 focus:ring-gray-500 hover:bg-gray-100'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-checked={darkMode}
                role="switch"
              >
                {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}