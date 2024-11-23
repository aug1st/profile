'use client'

import React, { useState } from 'react'
import { Mail, Phone, Linkedin, Award, GraduationCap, Briefcase, BookOpen, User, Moon, Sun, Server, Shield, Code, Database } from 'lucide-react'

export function ProfessionalItCv() {
  const [darkMode, setDarkMode] = useState(false)
  const [expandedJobs, setExpandedJobs] = useState<{[key: string]: boolean}>({
    hafniaIT: false,
    hafniaFS: false,
    axa: false,
    worldKitchen: false,
    veolia: false
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleJob = (jobKey: string) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobKey]: !prev[jobKey]
    }))
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-5xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
          <header className={`px-8 py-12 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-blue-900 to-blue-700'} rounded-t-lg relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}></div>
            </div>
            
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-blue-400 opacity-50 rounded-full"></div>
                <h1 className="text-5xl font-bold text-white tracking-tight mb-2">Calvin Wong</h1>
                <p className="text-xl text-blue-100 font-light tracking-wide">Driving Innovation and Security in IT Operations</p>
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
                  <a href="tel:+6588005310" className="ml-3 hover:text-white transition-colors">+65 8800 5310</a>
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

          <main className="px-8 py-10">
            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <User className="h-6 w-6 mr-3 text-blue-600" />
                Professional Summary
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                As an experienced IT leader and cybersecurity expert, I specialize in developing and implementing robust technical
                solutions that enhance business security and efficiency. My expertise spans cybersecurity risk management,
                technical design, and strategic project leadership. With a proven track record in IT governance, cloud infrastructure,
                and cybersecurity frameworks (ISO/IEC 27001, PCI-DSS), I drive seamless business operations while ensuring strong
                compliance with industry standards. Leveraging my in-depth technical knowledge and strong leadership abilities, I
                successfully navigate complex IT projects, security initiatives, and data centre operations to guarantee the seamless
                execution of business objectives.
              </p>
            </section>

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
                        <span><strong className="text-blue-600 dark:text-blue-400">Achieved 99% System Uptime:</strong> Collaborated with internal teams and external vendors to maintain over 99% system availability, safeguarding business continuity.</span>
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

            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
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

            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Award className="h-6 w-6 mr-3 text-blue-600" />
                Certifications
              </h2>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>AWS Certified SysOps Administrator – Associate (2021)</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>AWS Certified Developer – Associate (2020)</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>AWS Certified Solutions Architect – Associate (2020)</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Practitioner Certificate in Personal Data Protection (SG) (2020)</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Lean Six Sigma (LSS) Yellow Belt Certification (2020)</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                Training
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
                    <span>NICF- Microsoft Azure Administrator</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>NICF - Certified Information Systems Auditor</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Practitioner Certificate in Personal Data Protection (SG)</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Code className="h-6 w-6 mr-2 text-blue-600" />
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
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
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
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
                    <li>Next.js</li>
                  </ul>
                </div>
              </div>
            </section>
          </main>

          <footer className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} Calvin Wong. All rights reserved.
              </p>
              
              <button
                onClick={toggleDarkMode}
                className={`fixed bottom-6 right-6 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg ${
                  darkMode
                    ? 'bg-gray-700 text-yellow-300 focus:ring-yellow-500 hover:bg-gray-600'
                    : 'bg-white text-gray-800 focus:ring-gray-500 hover:bg-gray-100'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
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