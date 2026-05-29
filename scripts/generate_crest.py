import os

def generate_crest():
    svg_content = """<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
  <!-- Shield Outline -->
  <path d="M 50,5 L 90,5 L 90,45 Q 90,85 50,115 Q 10,85 10,45 L 10,5 Z" fill="#0D0D1A" />
  
  <!-- Clipping path for the inside of the shield -->
  <defs>
    <clipPath id="shield-clip">
      <path d="M 50,5 L 90,5 L 90,45 Q 90,85 50,115 Q 10,85 10,45 L 10,5 Z" />
    </clipPath>
  </defs>

  <g clip-path="url(#shield-clip)">
    <!-- Left Half: Catalan Stripes (Senyera spirit) -->
    <rect x="10" y="5" width="40" height="115" fill="#004D98" />
    <rect x="18" y="5" width="5" height="115" fill="#A50044" />
    <rect x="28" y="5" width="5" height="115" fill="#A50044" />
    <rect x="38" y="5" width="5" height="115" fill="#A50044" />
    <rect x="48" y="5" width="2" height="115" fill="#A50044" />

    <!-- Right Half: Sant Jordi's Cross abstract -->
    <rect x="50" y="5" width="40" height="115" fill="#004D98" />
    <path d="M 55,10 L 85,40 M 85,10 L 55,40" stroke="#A50044" stroke-width="6" fill="none" />
    
    <!-- Top Center Star -->
    <path d="M 50,15 L 52,22 L 59,22 L 54,27 L 56,34 L 50,30 L 44,34 L 46,27 L 41,22 L 48,22 Z" fill="#FFD700" />
  </g>
</svg>"""
    
    output_path = "assets/images/barca-silhouette.svg"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        f.write(svg_content)
    print(f"Generated {output_path}")

if __name__ == "__main__":
    generate_crest()
