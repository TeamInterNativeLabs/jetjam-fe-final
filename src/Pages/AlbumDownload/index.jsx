import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { UserLayout } from "../../Components/Layout";
import { getApiBaseUrl } from "../../Config/env";
import { bg_cover2 } from "../../assets";

const AlbumDownload = () => {
  const { token } = useParams();
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch(`${getApiBaseUrl()}/album/download-by-token/${token}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.message || "Download failed. This link may be invalid.");
        return;
      }

      // Get filename from Content-Disposition header if available
      const disposition = res.headers.get('Content-Disposition');
      const match = disposition && disposition.match(/filename="?([^"]+)"?/);
      const filename = match ? match[1] : 'album.zip';

      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setDone(true);
    } catch (e) {
      setError("Download failed. Please try again or contact support.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <img src={bg_cover2} alt="background" style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        objectFit: 'cover', zIndex: -1, opacity: 0.3
      }} />
      <UserLayout>
        <div style={{
          minHeight: '80vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '40px 20px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              borderRadius: '20px',
              padding: '48px 40px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
          >
            {error ? (
              <>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                <h2 style={{ color: '#ff6b6b', fontWeight: 700, marginBottom: '12px' }}>
                  Download Failed
                </h2>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                  {error}
                </p>
                <p style={{ color: '#666', fontSize: '12px' }}>
                  If you believe this is an error, please contact us at{' '}
                  <a href="mailto:johnnyo@jetjams.net" style={{ color: '#3cbff3' }}>
                    johnnyo@jetjams.net
                  </a>
                </p>
              </>
            ) : done ? (
              <>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎵</div>
                <h2 style={{ color: '#F6D027', fontWeight: 900, marginBottom: '12px' }}>
                  Download Complete!
                </h2>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                  Your album is downloading. Enjoy the music!
                </p>
                <button
                  onClick={handleDownload}
                  style={{
                    background: 'rgba(246,208,39,0.15)', border: '1px solid rgba(246,208,39,0.4)',
                    color: '#F6D027', borderRadius: '8px', padding: '10px 24px',
                    fontSize: '14px', cursor: 'pointer'
                  }}
                >
                  Download again
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎶</div>
                <h2 style={{ color: '#3cbff3', fontWeight: 900, fontSize: '26px',
                  fontFamily: '"Azonix", cursive', marginBottom: '8px' }}>
                  Your Album is Ready
                </h2>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>
                  Thank you for your purchase!
                </p>
                <p style={{ color: '#666', fontSize: '12px', marginBottom: '32px' }}>
                  This link is permanent — you can download your album as many times as you want.
                </p>
                <motion.button
                  onClick={handleDownload}
                  disabled={downloading}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'linear-gradient(135deg, #3cbff3, #6565ff)',
                    border: 'none', color: '#fff', fontWeight: 800,
                    fontSize: '18px', borderRadius: '12px',
                    padding: '16px 48px', cursor: 'pointer',
                    width: '100%', opacity: downloading ? 0.7 : 1,
                    transition: 'opacity 0.2s'
                  }}
                >
                  {downloading ? '⏳ Downloading…' : '⬇ Download Album'}
                </motion.button>
                <p style={{ color: '#444', fontSize: '11px', marginTop: '16px' }}>
                  🔒 Secure download · JetJams LLC
                </p>
              </>
            )}
          </motion.div>
        </div>
      </UserLayout>
    </>
  );
};

export default AlbumDownload;
