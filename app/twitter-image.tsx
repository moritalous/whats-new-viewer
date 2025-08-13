import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "What's New Viewer - 8-bit Style";
export const size = {
  width: 1200,
  height: 600,
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
            backgroundSize: '30px 30px',
          }}
        />

        {/* Retro border */}
        <div
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            right: '15px',
            bottom: '15px',
            border: '3px solid #00ffff',
            borderRadius: '6px',
            boxShadow: '0 0 15px rgba(0,255,255,0.5)',
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
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#00ff00',
              textShadow: '3px 3px 0px #008800, 6px 6px 0px #004400',
              marginBottom: '15px',
              fontFamily: 'monospace',
              letterSpacing: '3px',
            }}
          >
            WHAT&apos;S NEW
          </div>

          <div
            style={{
              fontSize: '40px',
              color: '#ffff00',
              textShadow: '2px 2px 0px #cccc00, 4px 4px 0px #999900',
              marginBottom: '35px',
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
              gap: '15px',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                background: '#ff0080',
                border: '2px solid #ffffff',
              }}
            />
            <div
              style={{
                fontSize: '20px',
                color: '#ffffff',
                fontFamily: 'monospace',
                textShadow: '1px 1px 0px #000000',
              }}
            >
              RSS READER
            </div>
            <div
              style={{
                width: '30px',
                height: '30px',
                background: '#ff0080',
                border: '2px solid #ffffff',
              }}
            />
          </div>
        </div>

        {/* Corner decorations */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            width: '40px',
            height: '40px',
            background: '#ff6600',
            border: '2px solid #ffffff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            width: '40px',
            height: '40px',
            background: '#6600ff',
            border: '2px solid #ffffff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            width: '40px',
            height: '40px',
            background: '#00ff66',
            border: '2px solid #ffffff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            width: '40px',
            height: '40px',
            background: '#ff0066',
            border: '2px solid #ffffff',
          }}
        />

        {/* Logo in bottom center - circular clipped, no border */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '60px',
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
            width="60"
            height="60"
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
