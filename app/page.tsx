"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Rocket, Terminal, Github, Linkedin, Mail, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleScroll = () => {
    const sections = ["home", "about", "skills", "projects"]
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Terminal className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">
              AceCommander<span className="text-green-500">09</span>
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex gap-6"
          >
            {["home", "about", "skills", "projects", "contact"].map((section, index) => (
              <a
                key={section}
                href={`#${section}`}
                className={`font-mono text-sm uppercase tracking-wider transition-colors hover:text-green-400 ${activeSection === section ? "text-green-500" : "text-gray-400"}`}
              >
                <span className="text-green-500 mr-1">/</span>
                {section}
              </a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:hidden"
          >
            <Button variant="ghost" size="icon" className="text-green-500">
              <Terminal className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <AnimatePresence>
                {loaded && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="font-mono text-green-500 mb-2"
                    >
                      <span className="inline-block">
                        $ initiating_sequence<span className="animate-blink">_</span>
                      </span>
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-4xl md:text-6xl font-bold mb-4"
                    >
                      Hi, I'm <span className="text-green-500">AceCommander09</span>
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <TypewriterEffect text="Full Stack Developer | Problem Solver | Code Enthusiast" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="text-gray-400 mt-4 mb-6 max-w-lg"
                    >
                      Crafting elegant solutions to complex problems. Specializing in modern web technologies and
                      scalable architecture.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="flex gap-4"
                    >
                      <Button className="bg-green-500 hover:bg-green-600 text-black">
                        View Projects <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                        Contact Me
                      </Button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative h-[300px] md:h-[400px] flex items-center justify-center"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping-slow opacity-50"></div>
                  <div className="absolute inset-4 bg-green-500/20 rounded-full animate-ping-slow animation-delay-500 opacity-50"></div>
                  <div className="absolute inset-8 bg-green-500/20 rounded-full animate-ping-slow animation-delay-1000 opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Terminal className="h-20 w-20 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <SectionHeader title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-gray-400 mb-4">
                I am a Java Coder, I make Minecraft mods and I design 3D models.
              </p>
              <p className="text-gray-400 mb-4">
                I have made over 6 Minecraft mods on Modrinth and over 5 3D models on Makerworld.
              </p>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                  <Linkedin className="mr-2 h-4 w-4" /> Linkedin
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-900/50 border border-green-500/20 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Code className="mr-2 h-5 w-5 text-green-500" /> Core Skills
              </h3>
              <ul className="space-y-3">
                {[
                  "3D modeling on Makerworld in Fusion 360",
                  "Java coding",
                  "Minecraft Mods",
                ].map((skill, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center text-gray-300"
                  >
                    <span className="text-green-500 mr-2">❯</span> {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-black to-zinc-900">
        <div className="container mx-auto px-4">
          <SectionHeader title="Technical Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Java",
                icon: <Code className="h-10 w-10 text-green-500" />,
                skills: ["Minecraft mods", "This website", "React", "Javascript"],
              },
              {
                title: "Python",
                icon: <Terminal className="h-10 w-10 text-green-500" />,
                skills: ["Idle", "Minecraft"],
              },
              {
                title: "3D modeling",
                icon: <Rocket className="h-10 w-10 text-green-500" />,
                skills: ["Fushion 360", "Blender", "Blockbench", "Shapr3D"],
              },
              {
                title: "Tools",
                icon: <Terminal className="h-10 w-10 text-green-500" />,
                skills: ["GitHub", "VS Code", "Vercel"],
              },
              {
                title: "Other",
                icon: <Code className="h-10 w-10 text-green-500" />,
                skills: ["Agile", "UI/UX Design", "WebSockets", "Testing"],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border border-green-500/20 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {category.icon}
                      <h3 className="text-xl font-bold ml-3">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.3 + skillIndex * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-300">{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <SectionHeader title="Featured Projects" subtitle="Projects I have worked on recently" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "A full-stack e-commerce solution with payment processing, inventory management, and analytics dashboard.",
                tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "AI Content Generator",
                description:
                  "An AI-powered application that generates marketing content based on user prompts and brand guidelines.",
                tech: ["React", "Python", "OpenAI API", "AWS"],
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Real-time Chat Application",
                description: "A secure messaging platform with end-to-end encryption, file sharing, and video calls.",
                tech: ["React", "Socket.io", "Express", "PostgreSQL"],
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Task Management System",
                description:
                  "A collaborative project management tool with Kanban boards, time tracking, and automated reporting.",
                tech: ["TypeScript", "React", "NestJS", "Redis"],
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Fitness Tracking App",
                description:
                  "A mobile-first application for tracking workouts, nutrition, and progress with personalized recommendations.",
                tech: ["React Native", "GraphQL", "Node.js", "MongoDB"],
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Portfolio Website",
                description: "A custom-designed portfolio website with animations, dark mode, and responsive design.",
                tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
                image: "/placeholder.svg?height=200&width=400",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-zinc-900 border border-green-500/20 overflow-hidden h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between mt-auto">
                      <Button variant="ghost" className="text-green-500 hover:bg-green-500/10 p-0">
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-500 hover:bg-green-500/10"
                      >
                        View Project <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-green-500 hover:bg-green-600 text-black">
              View All Projects <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <SectionHeader title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-gray-400 mb-6">
                I'm currently available for freelance work and full-time positions. If you have a project that needs
                some creative touch, I'd love to hear about it.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-300">acecommander09@example.com</span>
                </div>
                <div className="flex items-center">
                  <Github className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-300">github.com/acecommander09</span>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-300">linkedin.com/in/acecommander09</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-2">Connect with me</h4>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-green-500 text-green-500 hover:bg-green-500/10"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-green-500 text-green-500 hover:bg-green-500/10"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-green-500 text-green-500 hover:bg-green-500/10"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-zinc-900/50 border border-green-500/20 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 bg-black/50 border border-green-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 bg-black/50 border border-green-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full px-3 py-2 bg-black/50 border border-green-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-black/50 border border-green-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-black">Send Message</Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-green-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Terminal className="h-5 w-5 text-green-500" />
              <span className="font-mono text-lg font-bold">
                AceCommander<span className="text-green-500">09</span>
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AceCommander09. All rights reserved.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Section Header Component
function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 relative inline-block">
          {title}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-full"></span>
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-400 mt-4"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

// Typewriter Effect Component
function TypewriterEffect({ text }) {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [text])

  return (
    <h2 className="text-xl md:text-2xl text-gray-300 font-mono">
      {displayText}
      <span className="animate-blink text-green-500">_</span>
    </h2>
  )
}
