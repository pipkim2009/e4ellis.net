import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export function Header() {
    const { user, profile, signOut } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('signin');

    const handleSignOut = async () => {
        console.log('Sign out button clicked!');
        try {
            console.log('Calling signOut...');
            await signOut();
            console.log('Successfully signed out');
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out: ' + error.message);
        }
    };

    const openSignIn = () => {
        setAuthMode('signin');
        setShowAuthModal(true);
    };

    const openSignUp = () => {
        setAuthMode('signup');
        setShowAuthModal(true);
    };

    return (
        <header className="header">
            <div className="container header-container">
                <Link className="header-link" to="/">
                    E4Ellis.net
                </Link>
                <nav className="header-nav">
                    <Link className="nav-link" to="/projects">Projects</Link>

                    {user ? (
                        <div className="user-menu">
                            {profile && profile.approved && (
                                <span className="approval-approved">Approved</span>
                            )}
                            {profile && !profile.approved && (
                                <span className="approval-pending">Pending Approval</span>
                            )}
                            <span className={`user-email ${profile?.approved ? 'user-email-approved' : 'user-email-pending'}`}>
                                {user.email}
                            </span>
                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="nav-button"
                                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button onClick={openSignIn} className="nav-button">
                                Sign In
                            </button>
                            <button onClick={openSignUp} className="nav-button nav-button-primary">
                                Sign Up
                            </button>
                        </div>
                    )}
                </nav>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                mode={authMode}
            />
        </header>
    )
}