import os

def generate_messi():
    svg_content = """<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blaugrana-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A50044" />
      <stop offset="100%" stop-color="#004D98" />
    </linearGradient>
  </defs>
  
  <!-- Ground Line -->
  <line x1="0" y1="80" x2="100" y2="80" stroke="#FFD700" stroke-width="1" opacity="0.5" />

  <!-- HEAD -->
  <circle cx="50" cy="18" r="7" fill="url(#blaugrana-grad)" />
  
  <!-- NECK -->
  <rect x="47" y="24" width="6" height="6" fill="url(#blaugrana-grad)" />
  
  <!-- TORSO -->
  <path d="M 38,30 L 62,30 L 60,58 L 40,58 Z" fill="url(#blaugrana-grad)" />
  
  <!-- Albiceleste diagonal stripes -->
  <line x1="42" y1="30" x2="52" y2="58" stroke="white" stroke-width="1" opacity="0.3" />
  <line x1="48" y1="30" x2="58" y2="58" stroke="white" stroke-width="1" opacity="0.3" />
  <line x1="54" y1="30" x2="60" y2="45" stroke="white" stroke-width="1" opacity="0.3" />

  <!-- LEFT ARM (raised) -->
  <path d="M 40,32 Q 25,20 20,10" stroke="url(#blaugrana-grad)" stroke-width="4" fill="none" stroke-linecap="round" />
  
  <!-- RIGHT ARM (raised) -->
  <path d="M 60,32 Q 75,20 80,10" stroke="url(#blaugrana-grad)" stroke-width="4" fill="none" stroke-linecap="round" />
  
  <!-- TROPHY -->
  <g fill="#FFD700">
    <path d="M 35,8 Q 35,2 50,2 Q 65,2 65,8 L 60,18 L 40,18 Z" />
    <path d="M 46,18 L 54,18 L 52,24 L 48,24 Z" />
    <!-- Handles -->
    <path d="M 35,8 Q 30,8 30,12 Q 30,16 35,16" stroke="#FFD700" stroke-width="1.5" fill="none" />
    <path d="M 65,8 Q 70,8 70,12 Q 70,16 65,16" stroke="#FFD700" stroke-width="1.5" fill="none" />
  </g>
  
  <!-- LEFT LEG (kneeling) -->
  <path d="M 40,58 L 36,75 L 32,80 L 40,80 L 44,75 L 44,58 Z" fill="url(#blaugrana-grad)" />
  
  <!-- RIGHT LEG (kneeling) -->
  <path d="M 56,58 L 60,70 L 60,78 L 52,78 L 50,70 L 52,58 Z" fill="url(#blaugrana-grad)" />
</svg>"""
    
    output_path = "assets/images/messi-worldcup.svg"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        f.write(svg_content)
    print(f"Generated {output_path}")

if __name__ == "__main__":
    generate_messi()
