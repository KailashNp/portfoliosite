/* terminal.js - Advanced Interactive Portfolio Terminal */

document.addEventListener('DOMContentLoaded', () => {
    // Terminal Instances
    const terminals = [
        {
            input: document.getElementById('terminal-input'),
            body: document.getElementById('terminal-body'),
            window: document.querySelector('#terminal-section .terminal-window')
        },
        {
            input: document.getElementById('floating-terminal-input'),
            body: document.getElementById('floating-terminal-body'),
            window: document.getElementById('floating-terminal-overlay')
        }
    ];

    // --- CONFIGURATION ---
    const CHAR_SPEED = 40; // chars per second
    const MAX_LINES = 200;
    const PROMPT = '<span class="prompt">kailash@portfolio:~$</span>';
    
    // Shared Command History
    let history = [];
    let historyIndex = -1;

    // Current Navigation State
    let prevSection = 'hero';

    // --- COMMAND DEFINITIONS ---
    const commands = {
        help: () => {
            return `
<div class="help-grid">
    <div class="help-col">
        <strong>NAVIGATION</strong>
        <span>cd [dir]   - Move between sections</span>
        <span>ls         - List available sections</span>
        <span>pwd        - Print working directory</span>
    </div>
    <div class="help-col">
        <strong>INFO</strong>
        <span>whoami     - Personnel profile</span>
        <span>cat [file] - Read file content</span>
        <span>man kailash- Manual page</span>
    </div>
    <div class="help-col">
        <strong>SYSTEM</strong>
        <span>uname -a   - System info</span>
        <span>uptime     - System uptime</span>
        <span>top        - Process monitor</span>
        <span>date       - Current date/time</span>
    </div>
    <div class="help-col">
        <strong>FUN / SEC</strong>
        <span>ping [host]- Test connectivity</span>
        <span>nmap [host]- Security scan</span>
        <span>sudo [cmd] - Execute as root</span>
        <span>git log    - View life commits</span>
    </div>
</div>`.trim();
        },

        whoami: () => {
            const profile = window.portfolioData?.profile;
            return `
NAME:     ${profile?.name || 'Kailash'}
ROLE:     Cybersecurity & AI/ML Engineer
STATUS:   Authorized Access
BIO:      ${profile?.personality || 'The signal behind the noise'}
LOC:      ${profile?.location || 'Chennai / Noida'}
            `.trim();
        },

        pwd: () => "/home/kailash/portfolio",

        uname: (args) => {
            if (args.includes('-a')) return "KNP-OS 2.0.0 kailash-portfolio #Signal&Noise SMP";
            return "KNP-OS";
        },

        date: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + " IST",

        uptime: () => "Portfolio online for 1,248 days. No incidents.",

        top: () => `
PID   PROCESS              CPU%
001   critical-thinking    98%
002   problem-solving      87%
003   coffee-daemon        12%
004   learning-loop        99%
        `.trim(),

        history: () => {
            const journey = [
                "1  git commit -m \"started B.Tech CSE\"",
                "2  pip install curiosity",
                "3  ./build-fraud-engine.sh",
                "4  sudo become-better",
                "5  cat flag.txt"
            ];
            return journey.join('\n');
        },

        ls: (args) => {
            if (args[0] === 'projects/' && window.portfolioData) {
                return window.portfolioData.projects.map(p => `[${p.status || 'DONE'}] ${p.title}`).join('\n');
            }
            if (args[0] === 'skills/' && window.portfolioData) {
                const skills = window.portfolioData.skills;
                return Object.entries(skills).map(([cat, list]) => `${cat.toUpperCase()}: ${list.slice(0, 3).join(', ')}...`).join('\n');
            }
            if (args[0] === 'certs/' && window.portfolioData) {
                return window.portfolioData.certifications.map(c => c.title).join('\n');
            }

            return `
drwxr-xr-x  home/
drwxr-xr-x  about/
drwxr-xr-x  arsenal/
drwxr-xr-x  operations/
drwxr-xr-x  journey/
drwxr-xr-x  contact/
-rw-r--r--  resume.txt
-rw-r--r--  about.txt
-rw-r--r--  flag.txt
            `.trim();
        },

        cd: (args) => {
            const dest = args[0] || '~';
            const sections = {
                'home': 'hero',
                '~': 'hero',
                'about': 'about',
                'arsenal': 'arsenal',
                'operations': 'operations',
                'journey': 'journey',
                'contact': 'contact'
            };

            if (dest === '..') {
                scrollToSection(prevSection);
                return `Navigating to /${prevSection}... done.`;
            }

            if (dest === '/lab') {
                window.open('lab.html', '_blank');
                return "Opening Secret Lab in new tab...";
            }

            const sectionId = sections[dest.replace('/', '')];
            if (sectionId) {
                const currentId = document.querySelector('section[id]:hover')?.id || 'hero';
                prevSection = currentId;
                scrollToSection(sectionId);
                return `Navigating to /${dest.replace('/', '')}... done.`;
            }
            
            return `cd: no such directory: ${dest}`;
        },

        cat: (args) => {
            const file = args[0];
            if (file === 'flag.txt') return "FLAG{K41l4sh_1s_th3_0n3_wh0_kn0cks}\nThe signal is found where the noise is quietest.";
            if (file === 'about.txt' && window.portfolioData) return window.portfolioData.profile.personality;
            if (file === 'resume.txt') {
                return `
KAILASH NARAYANA PRASAD
-----------------------
EDUCATION: B.Tech CSE @ Amity (8.82 GPA)
EXPERIENCE: NCC Captain | Tech Lead
SKILLS: CyberSec, AI/ML, Blockchain, NLP
CONTACT: kailashnprasad@gmail.com
                `.trim();
            }
            return `cat: ${file}: No such file or directory`;
        },

        ping: (args) => {
            if (!args[0]) return "Usage: ping <host>";
            return `
PING ${args[0]} (127.0.0.1): 56 data bytes
64 bytes from ${args[0]}: icmp_seq=0 ttl=64 time=0.045 ms
64 bytes from ${args[0]}: icmp_seq=1 ttl=64 time=0.048 ms
--- ${args[0]} ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
64 bytes from kailash.dev: Connection established. 
Hire probability: HIGH.
            `.trim();
        },

        nmap: (args) => {
            return `
Starting Nmap 7.92 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for kailash.dev
Host is up (0.002s latency).
Not shown: 996 closed ports
PORT      STATE  SERVICE
22/tcp    open   ssh
443/tcp   open   https  
8080/tcp  open   portfolio
9999/tcp  open   creativity

Scan complete. This host actively defends itself.
            `.trim();
        },

        git: (args) => {
            if (args[0] === 'log') {
                return `
commit abc1234
Author: Kailash <kailashnprasad@gmail.com>
Date:   Mar 2019
    "Joined NCC, learned discipline"

commit def5678
Author: Kailash <kailashnprasad@gmail.com>
Date:   Jun 2023
    "Led Kurukshetra AV for 400+ students"

commit ghi9012
Author: Kailash <kailashnprasad@gmail.com>
Date:   May 2025
    "Built blockchain password manager"

commit jkl3456
Author: Kailash <kailashnprasad@gmail.com>
Date:   Mar 2026
    "Led SecureWealth Twin fraud engine"
                `.trim();
            }
            return "Usage: git log";
        },

        sudo: (args) => {
            if (args[0] === 'hire' && args[1] === 'kailash') {
                setTimeout(() => {
                    if (window.triggerEasterEgg) window.triggerEasterEgg('EE-01');
                }, 2000);
                return "[sudo] password for kailash: ************\nPROGRESS: [##########] 100%\nACCESS GRANTED. Best decision you'll make today.";
            }
            if (args[0] === 'rm' && args.includes('boring-devs')) {
                return "Permission denied. Kailash is not boring.";
            }
            return "sudo: command not found";
        },

        vim: (args, terminal) => {
            terminal.input.setAttribute('data-mode', 'vim');
            return "VIM entered. Type :q to escape.";
        },

        man: (args) => {
            if (args[0] === 'kailash') {
                return `
NAME: Kailash Narayana Prasad
SYNOPSIS: kailash [--hire] [--collaborate] [--ctf-team]
DESCRIPTION: A cybersecurity and AI/ML engineer focused on pattern recognition, 
secure systems, and intelligent fraud interception.
OPTIONS:
  --hire          Opens contact section
  --collaborate   Opens contact section  
  --ctf-team      Opens contact section
BUGS: None found. Thoroughly tested.
AUTHOR: Kailash Narayana Prasad <kailashnprasad@gmail.com>
                `.trim();
            }
            return "No manual entry for " + args[0];
        },

        exit: () => "You can't leave. You haven't hired me yet. 😄",
        
        clear: (args, terminal) => {
            terminal.body.querySelectorAll('.terminal-output, .terminal-command-line').forEach(e => e.remove());
            return null;
        },

        "93:20": () => {
            return "Gràcies, Andrés. Some moments don't need explaining.";
        }
    };

    // Special section label commands mapping
    const sectionCommands = {
        "/usr/bin/kailash --interactive": { cmd: "welcome", dest: "terminal-section" },
        "ls -la ./arsenal": { cmd: "ls skills/", dest: "arsenal" },
        "cat /var/log/projects.log": { cmd: "ls projects/", dest: "operations" },
        "git log --oneline": { cmd: "git log", dest: "journey" },
        "ssh recruiter@kailash.dev": { cmd: "contact info", dest: "contact" },
        "about.exe": { cmd: "about", dest: "about" },
        "cat ~/.profile | grep interests": { cmd: "interests", dest: "beyond" }
    };

    // --- UTILITIES ---

    function typeWriter(text, element) {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                element.innerHTML += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000 / CHAR_SPEED);
        });
    }

    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function cleanupHistory(body) {
        const lines = body.querySelectorAll('.terminal-output, .terminal-command-line');
        if (lines.length > MAX_LINES) {
            for (let i = 0; i < lines.length - MAX_LINES; i++) {
                lines[i].remove();
            }
        }
    }

    // --- INIT TERMINALS ---
    terminals.forEach(terminal => {
        if (!terminal.input || !terminal.body) return;

        terminal.input.addEventListener('keydown', async (e) => {
            // Tab Autocomplete
            if (e.key === 'Tab') {
                e.preventDefault();
                const val = terminal.input.value.trim();
                if (!val) return;
                const matches = Object.keys(commands).filter(c => c.startsWith(val));
                if (matches.length === 1) {
                    terminal.input.value = matches[0];
                }
            }

            // History Navigation
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    terminal.input.value = history[history.length - 1 - historyIndex];
                }
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminal.input.value = history[history.length - 1 - historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    terminal.input.value = '';
                }
            }

            if (e.key === 'Enter') {
                const fullCmd = terminal.input.value.trim();
                terminal.input.value = '';
                
                // Vim mode handler
                if (terminal.input.getAttribute('data-mode') === 'vim') {
                    if (fullCmd === ':q') {
                        terminal.input.removeAttribute('data-mode');
                        const cmdLine = document.createElement('div');
                        cmdLine.className = 'terminal-command-line';
                        cmdLine.innerHTML = `<span>:q</span>`;
                        terminal.body.insertBefore(cmdLine, terminal.input.parentElement);
                        
                        const output = document.createElement('div');
                        output.className = 'terminal-output';
                        output.textContent = "Smart. Most people are still trapped.";
                        terminal.body.insertBefore(output, terminal.input.parentElement);
                        return;
                    }
                }

                if (!fullCmd) return;

                // Add to history
                history.push(fullCmd);
                historyIndex = -1;

                // Display command
                const cmdLine = document.createElement('div');
                cmdLine.className = 'terminal-command-line';
                cmdLine.innerHTML = `${PROMPT} <span>${fullCmd}</span>`;
                terminal.body.insertBefore(cmdLine, terminal.input.parentElement);

                const output = document.createElement('div');
                output.className = 'terminal-output';
                terminal.body.insertBefore(output, terminal.input.parentElement);

                // Check for exact section label commands
                if (sectionCommands[fullCmd]) {
                    const map = sectionCommands[fullCmd];
                    await typeWriter(`Executing: ${map.cmd}... done. Redirecting.`, output);
                    scrollToSection(map.dest);
                } else {
                    const [cmd, ...args] = fullCmd.split(' ');
                    
                    if (commands[cmd]) {
                        const result = commands[cmd](args, terminal);
                        if (result) {
                            await typeWriter(result, output);
                        }
                    } else {
                        await typeWriter(`command not found: ${cmd}. Type 'help' for available commands.`, output);
                    }
                }

                cleanupHistory(terminal.body);
                terminal.body.scrollTop = terminal.body.scrollHeight;
            }
        });

        // Click to focus
        if (terminal.window) {
            terminal.window.addEventListener('click', () => terminal.input.focus());
        }
    });

    // --- FLOATING TERMINAL LOGIC ---
    const floatingOverlay = document.getElementById('floating-terminal-overlay');
    const floatingBtn = document.getElementById('floating-terminal-btn');
    const closeBtn = document.getElementById('close-floating-terminal');
    const minBtn = document.getElementById('min-floating-terminal');
    const maxBtn = document.getElementById('max-floating-terminal');
    const handle = document.getElementById('floating-terminal-handle');

    function openFloatingTerminal() {
        floatingOverlay.classList.remove('hidden');
        setTimeout(() => terminals[1].input.focus(), 100);
    }

    function closeFloatingTerminal() {
        floatingOverlay.classList.add('hidden');
    }
    
    window.toggleFloatingTerminal = function() {
        if (floatingOverlay.classList.contains('hidden')) {
            openFloatingTerminal();
        } else {
            closeFloatingTerminal();
        }
    };

    // Toggle shortcut Ctrl + ` or Ctrl+Shift+T
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === '`' || e.key === 'Dead' || e.keyCode === 192)) {
            e.preventDefault();
            toggleFloatingTerminal();
        }
        // Also support Ctrl+Shift+T as backup shortcut
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleFloatingTerminal();
        }
        
        // Esc to close
        if (e.key === 'Escape' && !floatingOverlay.classList.contains('hidden')) {
            closeFloatingTerminal();
        }
    });

    if (floatingBtn) {
        floatingBtn.addEventListener('click', openFloatingTerminal);
    }

    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.stopPropagation();
            closeFloatingTerminal();
        };
    }
    
    if (minBtn) {
        minBtn.onclick = function(e) {
            e.stopPropagation();
            const win = document.querySelector('.floating-terminal-window');
            if (win.style.height === '42px') {
                win.style.height = '400px';
            } else {
                win.style.height = '42px';
            }
        };
    }

    if (maxBtn) {
        maxBtn.onclick = function(e) {
            e.stopPropagation();
            const win = document.querySelector('.floating-terminal-window');
            win.classList.toggle('maximized');
            if (!win.classList.contains('maximized')) {
                win.style.height = '400px';
            } else {
                win.style.height = 'auto';
            }
        };
    }

    // Minimize restore on header click if minimized
    if (handle) {
        handle.addEventListener('click', function(e) {
            const win = document.querySelector('.floating-terminal-window');
            if (win.style.height === '42px') {
                win.style.height = '400px';
            }
        });
    }

    // Close on click outside
    if (floatingOverlay) {
        floatingOverlay.addEventListener('click', (e) => {
            if (e.target === floatingOverlay) {
                closeFloatingTerminal();
            }
        });
    }

    // Draggable logic
    if (handle && floatingOverlay) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        const win = document.querySelector('.floating-terminal-window');

        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = win.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            startX = e.clientX;
            startY = e.clientY;
            win.style.transform = 'none'; // remove centered transform to use absolute positioning
            win.style.left = initialX + 'px';
            win.style.top = initialY + 'px';
            win.style.bottom = 'auto';
            win.style.right = 'auto';
            win.style.margin = '0';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = (initialX + dx) + 'px';
            win.style.top = (initialY + dy) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
});
