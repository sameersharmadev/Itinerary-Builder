import React, { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaPlane, FaHotel, FaMapMarkedAlt, FaCheck, FaArrowLeft, FaArrowRight, FaTrash, FaEye, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import InputField from '../components/InputField';
import SimplePDFGenerator from '../components/SimplePDFGenerator';
import PDFPreview from '../components/PDFPreview';

export function ItineraryForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "Singapore Adventure",
        travelerName: "Rahul",
        travelers: "2",
        departure: "2024-01-10",
        arrival: "2024-01-15",
        destination: "Singapore",
        departure_from: "Delhi",
        flights: [
            {
                date: "2024-01-10",
                airline: "Fly Air India",
                flightNumber: "AX-123",
                from: "Delhi",
                to: "Singapore"
            },
            {
                date: "2024-01-10",
                airline: "Fly Air India", 
                flightNumber: "AX-123",
                from: "Delhi",
                to: "Singapore"
            },
            {
                date: "2024-01-10",
                airline: "Fly Air India",
                flightNumber: "AX-123", 
                from: "Delhi",
                to: "Singapore"
            },
            {
                date: "2024-01-15",
                airline: "Singapore Airlines",
                flightNumber: "SQ-456",
                from: "Singapore",
                to: "Delhi"
            }
        ],
        hotels: [
            {
                city: "Singapore",
                checkIn: "2024-01-10",
                checkOut: "2024-01-15",
                nights: 5,
                hotelName: "Marina Bay Sands\nLuxury Suite"
            },
            {
                city: "Singapore", 
                checkIn: "2024-01-12",
                checkOut: "2024-01-14",
                nights: 2,
                hotelName: "Raffles Hotel\nClassic Room"
            }
        ],
        days: [
            {
                dayNumber: 1,
                date: "2024-01-10",
                description: "Arrival & Marina Bay",
                morning: "• Arrive at Changi Airport\n• Hotel check-in\n• Welcome drinks",
                afternoon: "• Marina Bay Sands visit\n• Infinity Pool\n• Shopping at The Shoppes",
                evening: "• Gardens by the Bay\n• Light and Sound Show\n• Dinner at Marina Bay"
            },
            {
                dayNumber: 2,
                date: "2024-01-11", 
                description: "Cultural Singapore",
                morning: "• Breakfast at hotel\n• Visit Chinatown\n• Buddha Tooth Relic Temple",
                afternoon: "• Little India exploration\n• Mustafa Centre shopping\n• Indian cuisine lunch",
                evening: "• Clarke Quay riverside\n• River cruise\n• Dinner at rooftop restaurant"
            },
            {
                dayNumber: 3,
                date: "2024-01-12",
                description: "Universal Studios",
                morning: "• Early breakfast\n• Universal Studios Singapore\n• Transformers ride",
                afternoon: "• Continue Universal Studios\n• Jurassic Park area\n• Lunch at theme park",
                evening: "• Sentosa Island exploration\n• Beach walk\n• Seafood dinner"
            }
        ],
        inclusions: [
            "• Accommodation at 4* hotels",
            "• Daily breakfast",
            "• Airport transfers",
            "• City tours with guide",
            "• Entry tickets to attractions",
            "• Transportation in AC vehicle"
        ],
        exclusions: [
            "• International flights",
            "• Personal expenses", 
            "• Travel insurance",
            "• Tips and gratuities",
            "• Lunch and dinner (unless specified)",
            "• Visa fees"
        ],
        notes: "This is a sample itinerary for Singapore. All timings are flexible and can be adjusted based on your preferences. Weather conditions may affect outdoor activities."
    });

    const [tempFlight, setTempFlight] = useState({
        date: '',
        airline: '',
        flightNumber: '',
        from: '',
        to: '',
    });

    const [tempHotel, setTempHotel] = useState({
        city: '',
        checkIn: '',
        checkOut: '',
        nights: '',
        hotelName: '',
    });

    const [showPDFPreview, setShowPDFPreview] = useState(false);

    const steps = [
        { id: 1, title: "Trip Details", icon: FaMapMarkedAlt },
        { id: 2, title: "Flights", icon: FaPlane },
        { id: 3, title: "Hotels", icon: FaHotel },
        { id: 4, title: "Activities", icon: FaCalendarAlt },
        { id: 5, title: "Final Details", icon: FaCheck },
        { id: 6, title: "Review", icon: FaEye }
    ];

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addFlight = () => {
        if (tempFlight.date && tempFlight.airline && tempFlight.flightNumber && tempFlight.from && tempFlight.to) {
            setFormData(prev => ({
                ...prev,
                flights: [...prev.flights, tempFlight]
            }));
            setTempFlight({ date: '', airline: '', flightNumber: '', from: '', to: '' });
        }
    };

    const removeFlight = (index) => {
        setFormData(prev => ({
            ...prev,
            flights: prev.flights.filter((_, i) => i !== index)
        }));
    };

    const calculateNights = (checkIn, checkOut) => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            return nights > 0 ? nights : 0;
        }
        return 0;
    };

    const addHotel = () => {
        if (tempHotel.city && tempHotel.checkIn && tempHotel.checkOut && tempHotel.hotelName) {
            const nights = calculateNights(tempHotel.checkIn, tempHotel.checkOut);
            setFormData(prev => ({
                ...prev,
                hotels: [...prev.hotels, { ...tempHotel, nights }]
            }));
            setTempHotel({ city: '', checkIn: '', checkOut: '', nights: '', hotelName: '' });
        }
    };

    const removeHotel = (index) => {
        setFormData(prev => ({
            ...prev,
            hotels: prev.hotels.filter((_, i) => i !== index)
        }));
    };

    const addDay = () => {
        setFormData(prev => ({
            ...prev,
            days: [...prev.days, {
                dayNumber: prev.days.length + 1,
                date: '',
                description: '',
                morning: '',
                afternoon: '',
                evening: ''
            }]
        }));
    };

    const updateDay = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            days: prev.days.map((day, i) =>
                i === index ? { ...day, [field]: value } : day
            )
        }));
    };

    const removeDay = (index) => {
        setFormData(prev => ({
            ...prev,
            days: prev.days.filter((_, i) => i !== index).map((day, i) => ({
                ...day,
                dayNumber: i + 1
            }))
        }));
    };

    const nextStep = () => {
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const calculateTripDuration = () => {
        const { departure, arrival } = formData;
        if (departure && arrival) {
            const departureDate = new Date(departure);
            const arrivalDate = new Date(arrival);
            const timeDiff = arrivalDate - departureDate;
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            return `${days} days, ${days - 1} nights`;
        }
        return "";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', year: '2-digit', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-US', options).replace(/,/g, '');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple">Let's plan your trip!</h2>
                                <p className="text-gray-600">Tell us about your travel details</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Trip Title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => updateFormData('title', e.target.value)}
                                placeholder="Singapore Adventure"
                            />

                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Traveler Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.travelerName}
                                        onChange={(e) => updateFormData('travelerName', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Rahul"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Number of Travelers</label>
                                <div className="relative">
                                    <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        value={formData.travelers}
                                        onChange={(e) => updateFormData('travelers', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="2"
                                    />
                                </div>
                            </div>

                            <InputField
                                label="Departure From"
                                type="text"
                                value={formData.departure_from}
                                onChange={(e) => updateFormData('departure_from', e.target.value)}
                                placeholder="Mumbai"
                            />

                            <InputField
                                label="Destination"
                                type="text"
                                value={formData.destination}
                                onChange={(e) => updateFormData('destination', e.target.value)}
                                placeholder="Singapore"
                            />

                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Departure Date</label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.departure}
                                        onChange={(e) => updateFormData('departure', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Return Date</label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.arrival}
                                        onChange={(e) => updateFormData('arrival', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Flight Information</h2>
                                <p className="text-gray-600">Add your flight details</p>
                            </div>
                        </div>

                        {formData.flights.length > 0 && (
                            <div className="space-y-3 mb-6">
                                <h3 className="font-semibold text-gray-700">Added Flights:</h3>
                                {formData.flights.map((flight, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg min-h-[80px]">
                                        <div className="flex-1">
                                            <span className="font-medium">{flight.airline} ({flight.flightNumber})</span>
                                            <div className="text-sm text-gray-600">
                                                {formatDate(flight.date)} • {flight.from} → {flight.to}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFlight(index)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="p-6 rounded-lg min-h-[200px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Date</label>
                                    <input
                                        type="date"
                                        value={tempFlight.date}
                                        onChange={(e) => setTempFlight({ ...tempFlight, date: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                    />
                                </div>
                                
                                <InputField
                                    label="Airline"
                                    type="text"
                                    value={tempFlight.airline}
                                    onChange={(e) => setTempFlight({ ...tempFlight, airline: e.target.value })}
                                    placeholder="Airline"
                                />
                                
                                <InputField
                                    label="Flight Number"
                                    type="text"
                                    value={tempFlight.flightNumber}
                                    onChange={(e) => setTempFlight({ ...tempFlight, flightNumber: e.target.value })}
                                    placeholder="Flight Number"
                                />
                                
                                <InputField
                                    label="From"
                                    type="text"
                                    value={tempFlight.from}
                                    onChange={(e) => setTempFlight({ ...tempFlight, from: e.target.value })}
                                    placeholder="From"
                                />
                                
                                <InputField
                                    label="To"
                                    type="text"
                                    value={tempFlight.to}
                                    onChange={(e) => setTempFlight({ ...tempFlight, to: e.target.value })}
                                    placeholder="To"
                                />
                            </div>
                            <button
                                onClick={addFlight}
                                className="mt-4 px-6 py-2 bg-purple text-white rounded-lg transition"
                            >
                                Add Flight
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Hotel Bookings</h2>
                                <p className="text-gray-600">Add your accommodation details</p>
                            </div>
                        </div>

                        {formData.hotels.length > 0 && (
                            <div className="space-y-3 mb-6">
                                <h3 className="font-semibold text-gray-700">Added Hotels:</h3>
                                {formData.hotels.map((hotel, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg min-h-[80px]">
                                        <div className="flex-1">
                                            <span className="font-medium">{hotel.hotelName}</span>
                                            <div className="text-sm text-gray-600">
                                                {hotel.city} • {hotel.checkIn} to {hotel.checkOut} ({hotel.nights} nights)
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeHotel(index)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="p-6 rounded-lg min-h-[200px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <InputField
                                    label="Hotel Name"
                                    type="text"
                                    value={tempHotel.hotelName}
                                    onChange={(e) => setTempHotel({ ...tempHotel, hotelName: e.target.value })}
                                    placeholder="Hotel Name"
                                />
                                
                                <InputField
                                    label="City"
                                    type="text"
                                    value={tempHotel.city}
                                    onChange={(e) => setTempHotel({ ...tempHotel, city: e.target.value })}
                                    placeholder="City"
                                />
                                
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Check In</label>
                                    <input
                                        type="date"
                                        value={tempHotel.checkIn}
                                        onChange={(e) => setTempHotel({ ...tempHotel, checkIn: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Check Out</label>
                                    <input
                                        type="date"
                                        value={tempHotel.checkOut}
                                        onChange={(e) => setTempHotel({ ...tempHotel, checkOut: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={addHotel}
                                className="mt-4 px-6 py-2 bg-purple text-white rounded-lg transition"
                            >
                                Add Hotel
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Daily Activities</h2>
                                <p className="text-gray-600">Plan your day-by-day itinerary</p>
                            </div>
                        </div>

                        {formData.days.map((day, index) => (
                            <div key={index} className="p-6 rounded-lg min-h-[300px] border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold">Day {day.dayNumber}</h3>
                                    <button
                                        onClick={() => removeDay(index)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Date and Description in same row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-700 font-medium mb-2 block">Date</label>
                                            <div className="relative">
                                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={day.date}
                                                    onChange={(e) => updateDay(index, 'date', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                        
                                        <InputField
                                            label="Day Description"
                                            type="text"
                                            value={day.description}
                                            onChange={(e) => updateDay(index, 'description', e.target.value)}
                                            placeholder="e.g., Exploring Marina Bay"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-gray-700 font-medium mb-2 block">Morning</label>
                                            <textarea
                                                value={day.morning}
                                                onChange={(e) => updateDay(index, 'morning', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                rows="3"
                                                placeholder="Morning activities..."
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-700 font-medium mb-2 block">Afternoon</label>
                                            <textarea
                                                value={day.afternoon}
                                                onChange={(e) => updateDay(index, 'afternoon', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                rows="3"
                                                placeholder="Afternoon activities..."
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-700 font-medium mb-2 block">Evening</label>
                                            <textarea
                                                value={day.evening}
                                                onChange={(e) => updateDay(index, 'evening', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                rows="3"
                                                placeholder="Evening activities..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addDay}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition min-h-[60px]"
                        >
                            + Add Day
                        </button>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Final Details</h2>
                                <p className="text-gray-600">Add inclusions, exclusions, and notes</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Inclusions</label>
                                <textarea
                                    value={formData.inclusions.join('\n')}
                                    onChange={(e) => updateFormData('inclusions', e.target.value.split('\n'))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    rows="6"
                                    placeholder="• Accommodation&#10;• Breakfast&#10;• Transportation"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 font-medium mb-2 block">Exclusions</label>
                                <textarea
                                    value={formData.exclusions.join('\n')}
                                    onChange={(e) => updateFormData('exclusions', e.target.value.split('\n'))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    rows="6"
                                    placeholder="• Personal expenses&#10;• Travel insurance&#10;• Tips"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-700 font-medium mb-2 block">Additional Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => updateFormData('notes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="4"
                                placeholder="Any additional information or special requirements..."
                            />
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Itinerary Summary</h2>
                                <p className="text-gray-600">Review your complete itinerary and generate PDF</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6 min-h-[120px]">
                            <h3 className="text-lg font-semibold color-purple mb-4">Trip Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                <div>
                                    <p><strong>Trip Title:</strong> {formData.title || 'Not specified'}</p>
                                    <p><strong>Traveler Name:</strong> {formData.travelerName || 'Not specified'}</p>
                                    <p><strong>Destination:</strong> {formData.destination || 'Not specified'}</p>
                                    <p><strong>Departure From:</strong> {formData.departure_from || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p><strong>Duration:</strong> {calculateTripDuration() || 'Not specified'}</p>
                                    <p><strong>Travelers:</strong> {formData.travelers || 'Not specified'}</p>
                                    <p><strong>Departure:</strong> {formData.departure ? formatDate(formData.departure) : 'Not specified'}</p>
                                </div>
                            </div>
                        </div>

                        {formData.flights.length > 0 && (
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Details</h3>
                                <div className="space-y-3">
                                    {formData.flights.map((flight, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                            <span className="font-medium">{flight.airline} ({flight.flightNumber})</span>
                                            <span className="text-sm text-gray-600">
                                                {formatDate(flight.date)} • {flight.from} → {flight.to}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formData.hotels.length > 0 && (
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Accommodation</h3>
                                <div className="space-y-3">
                                    {formData.hotels.map((hotel, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                            <span className="font-medium">{hotel.hotelName}</span>
                                            <span className="text-sm text-gray-600">
                                                {hotel.city} • {hotel.checkIn} to {hotel.checkOut} ({hotel.nights} nights)
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formData.days.length > 0 && (
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Itinerary</h3>
                                <div className="space-y-4">
                                    {formData.days.map((day, index) => (
                                        <div key={index} className="border-l-4 border-gray-400 pl-4">
                                            <h4 className="font-semibold text-gray-800">
                                                Day {day.dayNumber}: {day.description} 
                                                {day.date && <span className="text-sm text-gray-600 ml-2">({formatDate(day.date)})</span>}
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm text-gray-600">
                                                {day.morning && <div><strong>Morning:</strong> {day.morning}</div>}
                                                {day.afternoon && <div><strong>Afternoon:</strong> {day.afternoon}</div>}
                                                {day.evening && <div><strong>Evening:</strong> {day.evening}</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.inclusions.some(item => item.trim()) && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold color-purple mb-3">Inclusions</h3>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        {formData.inclusions.filter(item => item.trim()).map((item, index) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {formData.exclusions.some(item => item.trim()) && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold color-purple mb-3">Exclusions</h3>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        {formData.exclusions.filter(item => item.trim()).map((item, index) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {formData.notes && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold color-purple mb-3">Additional Notes</h3>
                                <p className="text-sm text-gray-700">{formData.notes}</p>
                            </div>
                        )}

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold color-purple mb-4">Generate PDF</h3>
                            
                            <div className="flex gap-4 items-center justify-center">
                                <button
                                    onClick={() => setShowPDFPreview(!showPDFPreview)}
                                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                                >
                                    {showPDFPreview ? 'Hide Preview' : 'Preview PDF'}
                                </button>
                                
                                <SimplePDFGenerator formData={formData} />
                            </div>

                            {showPDFPreview && (
                                <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden">
                                    <PDFPreview formData={formData} />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                console.log('Final Form Data:', formData);
                                alert('Itinerary created successfully! Check console for data.');
                            }}
                            className="w-full py-4 bg-purple text-white rounded-lg transition text-lg font-medium min-h-[60px]"
                        >
                            Create Itinerary
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header/Navbar */}
            <header className="shadow-sm sticky top-0 z-50 mb-8 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold color-purple">Vigovia</h1>
                                <p className="text-xs text-gray-500 -mt-1">Travel Planning</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Home</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Destinations</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Plans</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">About</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Contact</a>
                        </nav>

                        {/* Desktop CTA Button */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="px-4 py-2 text-gray-600 hover:text-purple-600 font-medium transition">
                                Sign In
                            </button>
                            <button className="px-6 py-2 bg-purple text-white rounded-lg hover:bg-opacity-90 transition font-medium">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-gray-100 transition"
                        >
                            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 py-4">
                            <nav className="flex flex-col space-y-4">
                                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-1">Home</a>
                                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-1">Destinations</a>
                                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-1">Plans</a>
                                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-1">About</a>
                                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-1">Contact</a>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <button className="block w-full text-left px-2 py-2 text-gray-600 hover:text-purple-600 font-medium transition">
                                        Sign In
                                    </button>
                                    <button className="block w-full mt-2 px-4 py-2 bg-purple text-white rounded-lg hover:bg-opacity-90 transition font-medium">
                                        Get Started
                                    </button>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;

                            return (
                                <div key={step.id} className="flex items-center justify-center">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${isCompleted
                                        ? 'bg-purple border-purple text-white'
                                        : isActive
                                            ? 'bg-purple border-purple text-white'
                                            : 'bg-white border-gray-300 text-gray-400'
                                        }`}>
                                        {isCompleted ? <FaCheck /> : <Icon />}
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <p className={`font-medium ${isActive ? 'color-purple' : isCompleted ? 'color-purple' : 'text-gray-400'}`}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`hidden md:block w-16 h-0.5 mx-4 ${isCompleted ? 'bg-purple' : 'bg-gray-300'
                                            }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 mb-8 min-h-[500px] border border-neutral-200">
                    {renderStep()}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${currentStep === 1
                            ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <FaArrowLeft />
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === 6}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${currentStep === 6
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-purple text-white'
                            }`}
                    >
                        Next
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}