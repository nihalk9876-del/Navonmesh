import React, { useState } from 'react';
import '../Styles/support_qr.css';

const SupportQR = () => {
    const [groupNumber, setGroupNumber] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null, 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!groupNumber || isNaN(groupNumber) || groupNumber < 1 || groupNumber > 100) {
            alert('Please enter a valid Group Number between 1 and 100.');
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/issues/raise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupNumber: parseInt(groupNumber),
                    issueDescription: issueDescription.trim() || 'General Assistance Required'
                })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Support request failed:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="support-qr-page">
            <div className="support-container">
                <div className="support-header">
                    <h2>🚨 MISSION CONTROL 🚨</h2>
                    <p>HACKATHON SUPPORT STREAM</p>
                </div>

                {status === 'success' ? (
                    <div className="support-success">
                        <div className="success-icon">✔️</div>
                        <h3>Distress Signal Received</h3>
                        <p>Our coordination team has been alerted.</p>
                        <p className="highlight-text">Please remain at your station. We are on our way!</p>
                        <button className="reset-btn" onClick={() => { setStatus(null); setGroupNumber(''); setIssueDescription(''); }}>Submit Another Request</button>
                    </div>
                ) : (
                    <form className="support-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>ENTER GROUP NUMBER</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                placeholder="E.g. 42"
                                value={groupNumber}
                                onChange={(e) => setGroupNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group" style={{ marginTop: '15px' }}>
                            <label>WHAT IS THE ISSUE? (OPTIONAL)</label>
                            <textarea
                                placeholder="E.g. Need extension board, WiFi disconnected, etc."
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                                rows="3"
                                style={{ width: '100%', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: '1rem', borderRadius: '8px', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical' }}
                            />
                        </div>
                        <p className="support-info">
                            Scanning this QR triggers a Level-1 distress signal directly to the main Admin Command Center.
                        </p>
                        <button type="submit" className="submit-alert-btn" disabled={loading}>
                            {loading ? 'SENDING SIGNAL...' : 'RAISE ALERT'}
                        </button>
                        {status === 'error' && (
                            <p className="error-text">Connection lost. Failed to send signal. Find a volunteer immediately.</p>
                        )}
                    </form>
                )}
            </div>

            {/* Background elements */}
            <div className="radar-scanner"></div>
        </div>
    );
};

export default SupportQR;
