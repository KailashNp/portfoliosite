import os

def generate_messi():
    svg_content = """<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="barca-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#A50044"/>
      <stop offset="100%" style="stop-color:#004D98"/>
    </linearGradient>
  </defs>

  <!-- Head tilted back, looking up -->
  <ellipse cx="60" cy="22" rx="9" ry="10" fill="#A50044"/>
  
  <!-- Neck -->
  <rect x="56" y="31" width="8" height="8" rx="2" fill="#A50044"/>
  
  <!-- Torso leaning back slightly -->
  <path d="M 42,38 L 78,38 L 80,75 L 40,75 Z" fill="url(#barca-grad)"/>
  
  <!-- Jersey stripes suggestion -->
  <line x1="50" y1="38" x2="48" y2="75" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <line x1="60" y1="38" x2="60" y2="75" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <line x1="70" y1="38" x2="72" y2="75" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  
  <!-- Left arm raised high, curved inward to trophy -->
  <path d="M 42,42 Q 20,20 32,5" stroke="#A50044" stroke-width="8" fill="none" stroke-linecap="round"/>
  
  <!-- Right arm raised high, curved inward to trophy -->
  <path d="M 78,42 Q 100,20 88,5" stroke="#004D98" stroke-width="8" fill="none" stroke-linecap="round"/>
  
  <!-- TROPHY (gold) - World Cup style: sphere on stem on base -->
  <!-- Base -->
  <rect x="44" y="14" width="32" height="6" rx="2" fill="#FFD700"/>
  <!-- Stem -->
  <rect x="56" y="4" width="8" height="12" fill="#FFD700"/>
  <!-- Cup bowl -->
  <path d="M 38,4 Q 38,-4 60,-6 Q 82,-4 82,4 L 75,14 L 45,14 Z" fill="#FFD700"/>
  <!-- Cup shine -->
  <path d="M 48,2 Q 52,-2 60,-3" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"/>
  
  <!-- Head kissing trophy: lips near the base -->
  <path d="M 54,18 Q 60,22 66,18" stroke="#FFD700" stroke-width="2" fill="none" stroke-linecap="round"/>
  
  <!-- Left leg - kneeling, knee on ground -->
  <path d="M 45,75 L 38,100 L 32,110 L 45,110 L 50,100 L 50,75 Z" fill="url(#barca-grad)"/>
  
  <!-- Right leg - other knee on ground -->
  <path d="M 75,75 L 82,100 L 88,110 L 75,110 L 70,100 L 70,75 Z" fill="url(#barca-grad)"/>
  
  <!-- Ground shadow -->
  <ellipse cx="60" cy="114" rx="30" ry="4" fill="rgba(255,215,0,0.2)"/>
  
  <!-- Argentina flag colors at bottom: light blue + white + light blue -->
  <rect x="30" y="118" width="60" height="3" fill="#74ACDF"/>
  <rect x="30" y="121" width="60" height="3" fill="#FFFFFF"/>
  <rect x="30" y="124" width="60" height="3" fill="#74ACDF"/>
</svg>"""
    
    output_path = "assets/images/messi-worldcup.svg"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        f.write(svg_content)
    print(f"Generated {output_path}")

if __name__ == "__main__":
    generate_messi()