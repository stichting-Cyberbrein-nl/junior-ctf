// Check if username is available
export const isUsernameAvailable = async (username) => {
    try {
        const response = await fetch(`/api/session?action=check&username=${encodeURIComponent(username)}`);
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error('Error checking username availability:', error);
        return false;
    }
};

// Save user session
export const saveSession = async (username, data) => {
    try {
        // Preserve the original data structure
        const sessionData = {
            ...data,
            createdAt: data.createdAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const response = await fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, data: sessionData }),
        });

        if (!response.ok) {
            throw new Error('Failed to save session');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving session:', error);
        throw error;
    }
};

// Load user session
export const loadSession = async (username) => {
    try {
        const response = await fetch(`/api/session?action=load&username=${encodeURIComponent(username)}`);
        
        if (response.status === 404) {
            return null;
        }

        if (response.status === 410) {
            // Session expired
            localStorage.removeItem('username');
            return null;
        }

        if (!response.ok) {
            throw new Error('Failed to load session');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading session:', error);
        return null;
    }
};

// Update session data
export const updateSession = async (username, newData) => {
    try {
        const existingData = await loadSession(username);
        if (!existingData) {
            return false;
        }

        // Preserve the original data structure while updating
        const updatedData = {
            ...existingData,
            ...newData,
            lastUpdated: new Date().toISOString()
        };

        await saveSession(username, updatedData);
        return true;
    } catch (error) {
        console.error('Error updating session:', error);
        return false;
    }
}; 