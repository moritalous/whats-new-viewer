import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "What's New Viewer - 8-bit Style";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(45deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 8-bit style grid background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Retro border */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '4px solid #00ffff',
            borderRadius: '8px',
            boxShadow:
              '0 0 20px rgba(0,255,255,0.5), inset 0 0 20px rgba(0,255,255,0.2)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Pixel-style title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#00ff00',
              textShadow: '4px 4px 0px #008800, 8px 8px 0px #004400',
              marginBottom: '20px',
              fontFamily: 'monospace',
              letterSpacing: '4px',
            }}
          >
            WHAT&apos;S NEW
          </div>

          <div
            style={{
              fontSize: '48px',
              color: '#ffff00',
              textShadow: '3px 3px 0px #cccc00, 6px 6px 0px #999900',
              marginBottom: '40px',
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
          >
            VIEWER
          </div>

          {/* 8-bit style decorative elements */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#ff0080',
                border: '2px solid #ffffff',
              }}
            />
            <div
              style={{
                fontSize: '24px',
                color: '#ffffff',
                fontFamily: 'monospace',
                textShadow: '2px 2px 0px #000000',
              }}
            >
              RSS READER
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#ff0080',
                border: '2px solid #ffffff',
              }}
            />
          </div>

          {/* Bottom text */}
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              fontSize: '20px',
              color: '#ffffff',
              fontFamily: 'monospace',
              textAlign: 'center',
              textShadow: '2px 2px 0px #000000, 0 0 8px rgba(255,255,255,0.3)',
            }}
          >
            ▶ PRESS START TO CONTINUE ◀
          </div>
        </div>

        {/* Corner decorations */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            background: '#ff6600',
            border: '3px solid #ffffff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            background: '#6600ff',
            border: '3px solid #ffffff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            background: '#00ff66',
            border: '3px solid #ffffff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            background: '#ff0066',
            border: '3px solid #ffffff',
          }}
        />
        
        {/* Logo in bottom center - circular clipped, no border */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${baseUrl}/icon.svg`}
            alt="mor://a logo"
            width="80"
            height="80"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
