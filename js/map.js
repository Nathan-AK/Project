// EV Charging Map JavaScript functionality - Merged Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize notification system first
    createNotificationContainer();
    
    // Back button functionality
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Try to go back in browser history first
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback to main page if no history
                window.location.href = '/html/main.html';
            }
        });
    }

    // Profile dropdown functionality
    const profileBtn = document.getElementById('profileBtn');
    const profileContainer = document.querySelector('.profile-container');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileContainer.classList.toggle('active');
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileContainer.contains(e.target)) {
                profileContainer.classList.remove('active');
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // Add balance button functionality with hybrid approach
    const addBalanceBtn = document.querySelector('.add-balance-btn');
    if (addBalanceBtn) {
        addBalanceBtn.addEventListener('click', function() {
            // Show both notification and alert for better user feedback
            showNotification('Add Balance functionality - redirect to payment page', 'info');
            // Keep original alert for immediate feedback
            alert('Add Balance functionality - redirect to payment page');
            // window.location.href = '/html/payment.html';
        });
    }

    // Search functionality with debounced input and immediate filtering
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        // Immediate search for simple filtering
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterChargingStations(searchTerm);
        });

        // Enhanced search with debouncing for advanced features
        const debouncedAdvancedSearch = debounce(function(searchTerm) {
            if (searchTerm.length > 2) {
                performAdvancedSearch(searchTerm);
            }
        }, 300);

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            debouncedAdvancedSearch(searchTerm);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    }

    // Charging station interactions
    const chargingStations = document.querySelectorAll('.charging-station');
    chargingStations.forEach(station => {
        station.addEventListener('click', function() {
            const stationId = this.getAttribute('data-station');
            const isAvailable = this.classList.contains('available');
            showStationDetails(stationId, isAvailable);
        });
    });

    // EV icon interaction
    const evIcon = document.querySelector('.ev-icon');
    if (evIcon) {
        evIcon.addEventListener('click', function() {
            showCurrentLocationInfo();
        });
    }

    // Location labels interaction
    const locationLabels = document.querySelectorAll('.location-label');
    locationLabels.forEach(label => {
        label.addEventListener('click', function() {
            const locationName = this.querySelector('h3')?.textContent || 
                                this.querySelector('.university-text')?.textContent;
            if (locationName) {
                showLocationInfo(locationName);
            }
        });
    });

    // Keyboard shortcuts with enhanced functionality
    document.addEventListener('keydown', function(e) {
        // ESC key to close dropdown and modals
        if (e.key === 'Escape') {
            if (profileContainer) profileContainer.classList.remove('active');
            if (dropdownMenu) dropdownMenu.classList.remove('show');
            closeAllModals();
        }
        
        // Ctrl/Cmd + B for back
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            if (backBtn) backBtn.click();
        }
        
        // Ctrl/Cmd + F for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
    });

    // Initialize map animations
    initializeAnimations();
    
    // Initialize responsive handlers
    handleResponsiveFeatures();
    
    console.log('Voltrix EV Charging Map Loaded Successfully!');
});

// Function to filter charging stations based on search with enhanced feedback
function filterChargingStations(searchTerm) {
    const stations = document.querySelectorAll('.charging-station');
    const locationLabels = document.querySelectorAll('.location-label');
    
    if (!searchTerm) {
        // Show all stations and labels
        stations.forEach(station => {
            station.style.display = 'flex';
            station.style.opacity = '1';
            station.style.transform = 'scale(1)';
        });
        locationLabels.forEach(label => {
            label.style.display = 'block';
            label.style.opacity = '1';
            label.style.transform = 'scale(1)';
        });
        return;
    }
    
    let matchFound = false;
    
    // Filter stations with enhanced visual feedback
    stations.forEach(station => {
        const tooltip = station.querySelector('.station-tooltip')?.textContent.toLowerCase() || '';
        const stationNumber = station.querySelector('.station-number')?.textContent || '';
        
        if (tooltip.includes(searchTerm) || stationNumber.includes(searchTerm)) {
            station.style.display = 'flex';
            station.style.opacity = '1';
            station.style.transform = 'scale(1.1)';
            setTimeout(() => {
                if (station.style.transform === 'scale(1.1)') {
                    station.style.transform = 'scale(1)';
                }
            }, 300);
            matchFound = true;
        } else {
            station.style.opacity = '0.3';
            station.style.transform = 'scale(0.95)';
        }
    });
    
    // Filter location labels with smooth transitions
    locationLabels.forEach(label => {
        const labelText = label.textContent.toLowerCase();
        if (labelText.includes(searchTerm)) {
            label.style.opacity = '1';
            label.style.transform = 'scale(1.05)';
            setTimeout(() => {
                if (label.style.transform === 'scale(1.05)') {
                    label.style.transform = 'scale(1)';
                }
            }, 300);
            matchFound = true;
        } else {
            label.style.opacity = '0.3';
            label.style.transform = 'scale(0.95)';
        }
    });
    
    // Show notification for no results when search term is meaningful
    if (!matchFound && searchTerm.length > 2) {
        showNotification('No stations found matching your search', 'warning');
    }
}

// Enhanced search function for advanced features
function performAdvancedSearch(searchTerm) {
    console.log('Advanced search for:', searchTerm);
    showNotification(`Advanced searching for: ${searchTerm}`, 'info');
    // Advanced search features can be implemented here
    // Such as API calls, geolocation-based search, etc.
}

// Function to perform search with enhanced feedback
function performSearch(searchTerm) {
    if (!searchTerm.trim()) return;
    
    console.log('Searching for:', searchTerm);
    showNotification(`Searching for: ${searchTerm}`, 'info');
    
    // Check for search results
    const matchedStations = document.querySelectorAll('.charging-station[style*="opacity: 1"]');
    if (matchedStations.length === 0) {
        showNotification(`No charging stations found for "${searchTerm}"`, 'warning');
    } else {
        showNotification(`Found ${matchedStations.length} stations matching "${searchTerm}"`, 'success');
        console.log(`Found ${matchedStations.length} stations matching "${searchTerm}"`);
    }
}

// Function to show station details with hybrid modal + confirm approach
function showStationDetails(stationId, isAvailable) {
    const stationInfo = {
        1: { name: 'Station 1', location: 'Panunggangan Timur', slots: 1, available: 0, type: 'Fast Charging' },
        2: { name: 'Station 2', location: 'Central Area', slots: 1, available: 0, type: 'Standard Charging' },
        3: { name: 'Station 3', location: 'Mall Alam Sutera', slots: 16, available: 16, type: 'Rapid Charging' },
        4: { name: 'Station 4', location: 'University Area', slots: 8, available: 8, type: 'Fast Charging' },
        5: { name: 'Station 5', location: 'Residential Area', slots: 2, available: 0, type: 'Standard Charging' }
    };
    
    const station = stationInfo[stationId];
    if (station) {
        const status = isAvailable ? 'Available' : 'Occupied';
        const statusColor = isAvailable ? '#4CAF50' : '#f44336';
        
        // Try to show enhanced modal first, fallback to confirm
        try {
            showStationModal(station, status, statusColor, stationId);
        } catch (error) {
            // Fallback to original confirm dialog
            const message = `${station.name}\nLocation: ${station.location}\nStatus: ${status}\nSlots: ${station.available}/${station.slots} available`;
            if (confirm(`${message}\n\nWould you like to navigate to this station?`)) {
                navigateToStation(stationId);
            }
        }
    } else {
        console.error('Station not found:', stationId);
        showNotification('Station information not available', 'error');
    }
}

// Function to show station modal with enhanced UI
function showStationModal(station, status, statusColor, stationId) {
    const modal = document.createElement('div');
    modal.className = 'station-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        ">
            <div class="modal-header" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            ">
                <h2 style="margin: 0; color: #333;">${station.name}</h2>
                <span class="close-modal" style="
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                    hover: color: #333;
                ">&times;</span>
            </div>
            <div class="modal-body">
                <div class="station-info" style="margin-bottom: 20px;">
                    <p><strong>Location:</strong> ${station.location}</p>
                    <p><strong>Type:</strong> ${station.type}</p>
                    <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${status}</span></p>
                    <p><strong>Available Slots:</strong> ${station.available}/${station.slots}</p>
                </div>
                <div class="modal-actions" style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn-navigate" style="
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Navigate</button>
                    <button class="btn-reserve" style="
                        background: ${station.available > 0 ? '#2196F3' : '#ccc'};
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: ${station.available > 0 ? 'pointer' : 'not-allowed'};
                    " ${station.available === 0 ? 'disabled' : ''}>Reserve Slot</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const navigateBtn = modal.querySelector('.btn-navigate');
    const reserveBtn = modal.querySelector('.btn-reserve');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    navigateBtn.addEventListener('click', () => {
        navigateToStation(stationId);
        document.body.removeChild(modal);
    });
    
    if (!reserveBtn.disabled) {
        reserveBtn.addEventListener('click', () => {
            showNotification(`Slot reserved at ${station.name}`, 'success');
            document.body.removeChild(modal);
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Function to navigate to station with enhanced feedback
function navigateToStation(stationId) {
    console.log('Navigating to station:', stationId);
    
    // Enhanced notification
    showNotification(`Navigation started to Station ${stationId}`, 'success');
    
    // Keep original alert for immediate feedback
    alert(`Navigation started to Station ${stationId}`);
    
    // Example: Open Google Maps (uncomment to use)
    // const stationCoords = getStationCoordinates(stationId);
    // if (stationCoords) {
    //     window.open(`https://www.google.com/maps/dir/?api=1&destination=${stationCoords.lat},${stationCoords.lng}`, '_blank');
    // }
}

// Function to show current location info with enhanced modal
function showCurrentLocationInfo() {
    try {
        const locationModal = document.createElement('div');
        locationModal.className = 'station-modal';
        locationModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        `;
        
        locationModal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            ">
                <div class="modal-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                ">
                    <h2 style="margin: 0; color: #333;">Your EV Status</h2>
                    <span class="close-modal" style="
                        font-size: 24px;
                        cursor: pointer;
                        color: #999;
                    ">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="ev-status">
                        <div class="battery-info" style="margin-bottom: 15px;">
                            <h3 style="margin: 0 0 10px 0;">Battery Status</h3>
                            <div class="battery-level" style="font-size: 24px; font-weight: bold; color: #4CAF50;">45%</div>
                            <div class="battery-bar" style="
                                width: 100%;
                                height: 20px;
                                background: #eee;
                                border-radius: 10px;
                                overflow: hidden;
                                margin: 10px 0;
                            ">
                                <div class="battery-fill" style="
                                    width: 45%;
                                    height: 100%;
                                    background: linear-gradient(90deg, #4CAF50, #8BC34A);
                                    transition: width 0.3s;
                                "></div>
                            </div>
                        </div>
                        <p><strong>Estimated Range:</strong> 120km</p>
                        <p><strong>Last Charged:</strong> 2 hours ago</p>
                        <p><strong>Charging History:</strong> 12 sessions this month</p>
                        <p><strong>Nearest Station:</strong> Mall Alam Sutera (2.5km)</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(locationModal);
        
        // Close modal functionality
        const closeBtn = locationModal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(locationModal);
        });
        
        locationModal.addEventListener('click', (e) => {
            if (e.target === locationModal) {
                document.body.removeChild(locationModal);
            }
        });
    } catch (error) {
        // Fallback to original alert
        const currentInfo = {
            location: 'Your EV',
            battery: '45%',
            range: '120km',
            nearestStation: 'Mall Alam Sutera (2.5km)'
        };
        
        const message = `Current Location: ${currentInfo.location}\nBattery: ${currentInfo.battery}\nEstimated Range: ${currentInfo.range}\nNearest Station: ${currentInfo.nearestStation}`;
        alert(message);
    }
}

// Function to show location info with enhanced modal
function showLocationInfo(locationName) {
    const locationData = {
        'Panunggangan Timur': {
            description: 'Residential area with multiple charging options',
            facilities: ['24/7 Access', 'Covered Parking', 'Security'],
            distance: '2.5km'
        },
        'University Sutera': {
            description: 'Educational campus with student parking',
            facilities: ['Student Discount', 'Covered Parking', 'Cafe Nearby'],
            distance: '1.8km'
        },
        'Mall Alam Sutera': {
            description: 'Shopping center with fast charging stations',
            facilities: ['Shopping Mall', 'Food Court', 'Fast Charging', 'Valet Service'],
            distance: '3.2km'
        }
    };
    
    const location = locationData[locationName];
    
    if (location) {
        try {
            const locationModal = document.createElement('div');
            locationModal.className = 'station-modal';
            locationModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
            `;
            
            locationModal.innerHTML = `
                <div class="modal-content" style="
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                ">
                    <div class="modal-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    ">
                        <h2 style="margin: 0; color: #333;">${locationName}</h2>
                        <span class="close-modal" style="
                            font-size: 24px;
                            cursor: pointer;
                            color: #999;
                        ">&times;</span>
                    </div>
                    <div class="modal-body">
                        <p><strong>Description:</strong> ${location.description}</p>
                        <p><strong>Distance:</strong> ${location.distance}</p>
                        <p><strong>Facilities:</strong></p>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            ${location.facilities.map(facility => `<li>${facility}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            document.body.appendChild(locationModal);
            
            // Close modal functionality
            const closeBtn = locationModal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(locationModal);
            });
            
            locationModal.addEventListener('click', (e) => {
                if (e.target === locationModal) {
                    document.body.removeChild(locationModal);
                }
            });
        } catch (error) {
            // Fallback to original alert
            alert(`${locationName}\n\n${location.description}`);
        }
    } else {
        showNotification('Location information not available', 'warning');
    }
}

// Function to initialize animations with staggered effects
function initializeAnimations() {
    // Stagger animation for charging stations
    const stations = document.querySelectorAll('.charging-station');
    stations.forEach((station, index) => {
        station.style.animationDelay = `${index * 0.1}s`;
        station.style.opacity = '0';
        station.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            station.style.transition = 'all 0.5s ease';
            station.style.opacity = '1';
            station.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    // Animate location labels
    const locationLabels = document.querySelectorAll('.location-label');
    locationLabels.forEach((label, index) => {
        label.style.animationDelay = `${(index + stations.length) * 0.1}s`;
        label.style.opacity = '0';
        label.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            label.style.transition = 'all 0.6s ease';
            label.style.opacity = '1';
            label.style.transform = 'translateY(0)';
        }, (index + stations.length) * 100);
    });
}

// Function to handle responsive features
function handleResponsiveFeatures() {
    const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        const searchInput = document.querySelector('.search-input');
        const stations = document.querySelectorAll('.charging-station');
        
        // Adjust search input width on mobile
        if (searchInput && isMobile) {
            searchInput.style.width = '100%';
        }
        
        // Adjust station scaling for mobile
        stations.forEach(station => {
            if (isMobile) {
                station.style.transform = 'scale(0.9)';
            } else {
                station.style.transform = 'scale(1)';
            }
        });
        
        // Adjust tooltips position
        adjustTooltipPositions();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            handleResize();
        }, 100);
    });
    
    handleResize(); // Call once on load
}

// Function to adjust tooltip positions
function adjustTooltipPositions() {
    const tooltips = document.querySelectorAll('.station-tooltip');
    tooltips.forEach(tooltip => {
        const rect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // If tooltip goes off screen, adjust position
        if (rect.right > viewportWidth) {
            tooltip.style.left = 'auto';
            tooltip.style.right = '0';
        }
        
        if (rect.left < 0) {
            tooltip.style.left = '0';
            tooltip.style.right = 'auto';
        }
    });
}

// Function to create notification container
function createNotificationContainer() {
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

// Function to show notifications with enhanced styling
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        pointer-events: auto;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-size: 14px;
    `;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Helper function to get notification colors
function getNotificationColor(type) {
    const colors = {
        'info': '#2196F3',
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#f44336'
    };
    return colors[type] || colors.info;
}

// Function to close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.station-modal');
    modals.forEach(modal => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    });
}

// Utility function to debounce search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling wrapper
function safeExecute(func, errorMessage = 'An error occurred') {
    try {
        return func();
    } catch (error) {
        console.error(errorMessage, error);
        showNotification(errorMessage, 'error');
        return null;
    }
}

// Global error handling for uncaught errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
                showNotification('App is ready for offline use', 'success');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}