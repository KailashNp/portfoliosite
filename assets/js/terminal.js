/* terminal.js - Interactive Portfolio Terminal */

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');

  if (!input) return;

  const commands = {
    help: () => "Available commands: whoami, ls, cat, ping, ssh, sudo, clear, help, nmap, decrypt",
    whoami: () => "Kailash Narayana Prasad. CSE Undergrad. Cybersecurity Enthusiast. GPA: 8.82 | Chennai → Noida",
    ls: (args) => {
      if (args[0] === 'projects/') return "securewealth-twin/   personality-predict/   blockchain-passmanager/   ml-research-paper/   vikrant-assistant/";
      return "projects/   skills.txt   bio.md   certifications/";
    },
    cat: (args) => {
      if (args[0] === 'skills.txt') return "Languages: C++, Python, JS, C, Java, SQL\nSecurity: Encryption, Hashing, Blockchain\nTools: Linux, Git, Docker, VS Code";
      if (args[0] === 'bio.md') return "Pattern recognition across ML models and attack surfaces alike.";
      return `cat: ${args[0]}: No such file or directory`;
    },
    ping: (args) => {
      if (!args[0]) return "ping: missing host operand";
      return `PING ${args[0]} ... \n64 bytes from ${args[0]}: icmp_seq=1 ttl=64 time=0.001ms\nConnection established.`;
    },
    ssh: (args) => "Permission granted. See /contact for instructions.",
    sudo: (args) => {
      if (args[0] === 'hire' && args[1] === 'kailash') {
        // Trigger Konami code or special effect
        if (window.triggerEasterEgg) window.triggerEasterEgg('EE-01');
        return "SUDO ACCESS REQUESTED...\nACCESS GRANTED. Congratulations. You've made the right call.";
      }
      return "sudo: permission denied";
    },
    nmap: () => "PORT     STATE    SERVICE\n22/tcp   open     ssh\n443/tcp  open     https\n9999/tcp open     portfolio\nNote: This host actively defends itself.",
    clear: () => {
      const outputs = body.querySelectorAll('.terminal-output, .terminal-command-line');
      outputs.forEach(o => o.remove());
      return "";
    },
    decrypt: (args) => {
      if (!args[0]) return "Usage: decrypt <text>";
      // Simple ROT13
      return args[0].replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.value.trim();
      const [cmd, ...args] = fullCmd.split(' ');
      
      // Create command line entry
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-command-line';
      cmdLine.innerHTML = `<span class="prompt">kailash@portfolio:~$</span> <span>${fullCmd}</span>`;
      body.insertBefore(cmdLine, input.parentElement);

      if (cmd) {
        const output = document.createElement('div');
        output.className = 'terminal-output';
        
        if (commands[cmd]) {
          const result = commands[cmd](args);
          if (result) {
            output.textContent = result;
            body.insertBefore(output, input.parentElement);
          }
        } else {
          output.textContent = `-bash: ${cmd}: command not found`;
          body.insertBefore(output, input.parentElement);
        }
      }

      input.value = '';
      body.scrollTop = body.scrollHeight;

      if (cmd === 'help' || cmd === 'ssh') {
        if (window.triggerGif) window.triggerGif('onTerminalOpen');
      }
    }
  });
});
