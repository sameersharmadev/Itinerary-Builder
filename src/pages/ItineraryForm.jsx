import { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaPlane, FaHotel, FaMapMarkedAlt, FaCheck, FaArrowLeft, FaArrowRight, FaTrash, FaEye, FaBars, FaTimes, FaUser, FaStickyNote, FaClipboardList, FaChartBar, FaRunning, FaCreditCard, FaPassport } from 'react-icons/fa';
import InputField from '../components/InputField';
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
        notes: "This is a sample itinerary for Singapore. All timings are flexible and can be adjusted based on your preferences. Weather conditions may affect outdoor activities.",
        importantNotes: [
            {
                point: "Passport Validity",
                details: "Ensure your passport is valid for at least 6 months from the date of travel. Singapore requires minimum 6 months validity for entry."
            },
            {
                point: "Weather Considerations",
                details: "Singapore has a tropical climate. Pack light cotton clothes and always carry an umbrella. Indoor venues are heavily air-conditioned."
            },
            {
                point: "Currency Exchange",
                details: "Singapore Dollar (SGD) is the local currency. Credit cards are widely accepted. Carry some cash for local markets and street food."
            },
            {
                point: "Local Customs",
                details: "Singapore has strict laws regarding chewing gum, jaywalking, and littering. Always follow local guidelines and regulations."
            }
        ],

        scopeOfService: [
            {
                service: "Accommodation Services",
                details: "Booking and confirmation of hotels as per itinerary. Room upgrades subject to availability. Daily breakfast included at all properties."
            },
            {
                service: "Transportation Services",
                details: "Airport transfers in private vehicle. All sightseeing in air-conditioned coach. Local transport for specified activities included."
            },
            {
                service: "Tour Guide Services",
                details: "English speaking local guide for city tours. Guide available for 8 hours per day. Additional guide time can be arranged at extra cost."
            },
            {
                service: "Assistance Services",
                details: "24/7 emergency contact support. Local representative assistance. Help with booking additional activities and restaurants."
            }
        ],

        inclusionSummary: [
            {
                category: "Accommodation",
                count: "5",
                details: "Nights at 4-star hotels",
                comments: "Twin sharing basis, breakfast included"
            },
            {
                category: "Meals",
                count: "5",
                details: "Breakfast at hotels",
                comments: "Continental and local options available"
            },
            {
                category: "Transportation",
                count: "All",
                details: "Airport transfers and sightseeing",
                comments: "Private air-conditioned vehicles"
            },
            {
                category: "Attractions",
                count: "8",
                details: "Entry tickets included",
                comments: "Gardens by the Bay, Universal Studios, etc."
            },
            {
                category: "Guide Services",
                count: "3",
                details: "Days of guided tours",
                comments: "English speaking local guide"
            }
        ],

        activityTable: [
            {
                city: "Singapore",
                activity: "Gardens by the Bay",
                type: "Sightseeing",
                timeRequired: "3-4 Hours"
            },
            {
                city: "Singapore",
                activity: "Universal Studios",
                type: "Adventure",
                timeRequired: "Full Day"
            },
            {
                city: "Singapore",
                activity: "Marina Bay Sands SkyPark",
                type: "Sightseeing",
                timeRequired: "2-3 Hours"
            },
            {
                city: "Singapore",
                activity: "Chinatown Walking Tour",
                type: "Cultural",
                timeRequired: "2-3 Hours"
            },
            {
                city: "Singapore",
                activity: "Sentosa Island",
                type: "Leisure",
                timeRequired: "Half Day"
            },
        ],

        paymentPlan: [
            {
                heading: "Booking Confirmation",
                details: "Initial payment to confirm your booking and secure hotel reservations",
                installment: "1st Installment",
                amount: "₹25,000",
                dueDate: "2023-12-15"
            },
            {
                heading: "Second Payment",
                details: "Intermediate payment for flight bookings and activity confirmations",
                installment: "2nd Installment",
                amount: "₹35,000",
                dueDate: "2024-01-01"
            },
            {
                heading: "Final Payment",
                details: "Final balance payment including all remaining services and contingencies",
                installment: "Final Payment",
                amount: "₹15,000",
                dueDate: "2024-01-05"
            }
        ],

        visaDetails: [
            {
                visaType: "Tourist Visa",
                validity: "30 Days",
                processingDate: "2024-01-05"
            },
            {
                visaType: "Entry Permit",
                validity: "Single Entry",
                processingDate: "2024-01-05"
            }
        ]
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

    const [tempImportantNote, setTempImportantNote] = useState({
        point: '',
        details: ''
    });

    const [tempScopeOfService, setTempScopeOfService] = useState({
        service: '',
        details: ''
    });

    const [tempInclusionSummary, setTempInclusionSummary] = useState({
        category: '',
        count: '',
        details: '',
        comments: ''
    });

    const [tempActivity, setTempActivity] = useState({
        city: '',
        activity: '',
        type: '',
        timeRequired: ''
    });

    const [tempPaymentPlan, setTempPaymentPlan] = useState({
        installment: '',
        amount: '',
        dueDate: ''
    });

    const [tempVisaDetail, setTempVisaDetail] = useState({
        visaType: '',
        validity: '',
        processingDate: ''
    });

    const [showPDFPreview, setShowPDFPreview] = useState(false);

    const steps = [
        { id: 1, title: "Trip Details", icon: FaMapMarkedAlt },
        { id: 2, title: "Flights", icon: FaPlane },
        { id: 3, title: "Hotels", icon: FaHotel },
        { id: 4, title: "Activities", icon: FaCalendarAlt },
        { id: 5, title: "Information", icon: FaStickyNote },
        { id: 6, title: "Payments", icon: FaCreditCard },
        { id: 7, title: "Details", icon: FaCheck },
        { id: 8, title: "Review", icon: FaEye }
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

    const addImportantNote = () => {
        if (tempImportantNote.point && tempImportantNote.details) {
            setFormData(prev => ({
                ...prev,
                importantNotes: [...prev.importantNotes, tempImportantNote]
            }));
            setTempImportantNote({ point: '', details: '' });
        }
    };

    const removeImportantNote = (index) => {
        setFormData(prev => ({
            ...prev,
            importantNotes: prev.importantNotes.filter((_, i) => i !== index)
        }));
    };

    const addScopeOfService = () => {
        if (tempScopeOfService.service && tempScopeOfService.details) {
            setFormData(prev => ({
                ...prev,
                scopeOfService: [...prev.scopeOfService, tempScopeOfService]
            }));
            setTempScopeOfService({ service: '', details: '' });
        }
    };

    const removeScopeOfService = (index) => {
        setFormData(prev => ({
            ...prev,
            scopeOfService: prev.scopeOfService.filter((_, i) => i !== index)
        }));
    };

    const addInclusionSummary = () => {
        if (tempInclusionSummary.category && tempInclusionSummary.count && tempInclusionSummary.details) {
            setFormData(prev => ({
                ...prev,
                inclusionSummary: [...prev.inclusionSummary, tempInclusionSummary]
            }));
            setTempInclusionSummary({ category: '', count: '', details: '', comments: '' });
        }
    };

    const removeInclusionSummary = (index) => {
        setFormData(prev => ({
            ...prev,
            inclusionSummary: prev.inclusionSummary.filter((_, i) => i !== index)
        }));
    };

    const addActivity = () => {
        if (tempActivity.city && tempActivity.activity && tempActivity.type && tempActivity.timeRequired) {
            setFormData(prev => ({
                ...prev,
                activityTable: [...prev.activityTable, tempActivity]
            }));
            setTempActivity({ city: '', activity: '', type: '', timeRequired: '' });
        }
    };

    const removeActivity = (index) => {
        setFormData(prev => ({
            ...prev,
            activityTable: prev.activityTable.filter((_, i) => i !== index)
        }));
    };

    const addPaymentPlan = () => {
        if (tempPaymentPlan.heading && tempPaymentPlan.details && tempPaymentPlan.installment && tempPaymentPlan.amount && tempPaymentPlan.dueDate) {
            setFormData(prev => ({
                ...prev,
                paymentPlan: [...prev.paymentPlan, tempPaymentPlan]
            }));
            setTempPaymentPlan({ heading: '', details: '', installment: '', amount: '', dueDate: '' });
        }
    };

    const removePaymentPlan = (index) => {
        setFormData(prev => ({
            ...prev,
            paymentPlan: prev.paymentPlan.filter((_, i) => i !== index)
        }));
    };

    const addVisaDetail = () => {
        if (tempVisaDetail.visaType && tempVisaDetail.validity && tempVisaDetail.processingDate) {
            setFormData(prev => ({
                ...prev,
                visaDetails: [...prev.visaDetails, tempVisaDetail]
            }));
            setTempVisaDetail({ visaType: '', validity: '', processingDate: '' });
        }
    };

    const removeVisaDetail = (index) => {
        setFormData(prev => ({
            ...prev,
            visaDetails: prev.visaDetails.filter((_, i) => i !== index)
        }));
    };

    const nextStep = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
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
                    <div className="space-y-8">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Additional Information</h2>
                                <p className="text-gray-600">Important notes and activity details</p>
                            </div>
                        </div>

                        {/* Important Notes Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold color-purple">Important Notes</h3>

                            {formData.importantNotes.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-700">Added Notes:</h4>
                                    {formData.importantNotes.map((note, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1">
                                                <span className="font-medium">{note.point}</span>
                                                <div className="text-sm text-gray-600 mt-1">{note.details}</div>
                                            </div>
                                            <button
                                                onClick={() => removeImportantNote(index)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-gray-200 rounded-lg">
                                <InputField
                                    label="Point"
                                    type="text"
                                    value={tempImportantNote.point}
                                    onChange={(e) => setTempImportantNote({ ...tempImportantNote, point: e.target.value })}
                                    placeholder="e.g., Passport Validity"
                                />
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Details</label>
                                    <textarea
                                        value={tempImportantNote.details}
                                        onChange={(e) => setTempImportantNote({ ...tempImportantNote, details: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Detailed explanation..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        onClick={addImportantNote}
                                        className="px-6 py-2 bg-purple text-white rounded-lg transition"
                                    >
                                        Add Important Note
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Activity Table Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold color-purple">Activity Table</h3>

                            {formData.activityTable.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-700">Added Activities:</h4>
                                    {formData.activityTable.map((activity, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1 grid grid-cols-4 gap-4">
                                                <div><span className="font-medium">City:</span> {activity.city}</div>
                                                <div><span className="font-medium">Activity:</span> {activity.activity}</div>
                                                <div><span className="font-medium">Type:</span> {activity.type}</div>
                                                <div><span className="font-medium">Time:</span> {activity.timeRequired}</div>
                                            </div>
                                            <button
                                                onClick={() => removeActivity(index)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border border-gray-200 rounded-lg">
                                <InputField
                                    label="City"
                                    type="text"
                                    value={tempActivity.city}
                                    onChange={(e) => setTempActivity({ ...tempActivity, city: e.target.value })}
                                    placeholder="Singapore"
                                />
                                <InputField
                                    label="Activity"
                                    type="text"
                                    value={tempActivity.activity}
                                    onChange={(e) => setTempActivity({ ...tempActivity, activity: e.target.value })}
                                    placeholder="Gardens by the Bay"
                                />
                                <InputField
                                    label="Type"
                                    type="text"
                                    value={tempActivity.type}
                                    onChange={(e) => setTempActivity({ ...tempActivity, type: e.target.value })}
                                    placeholder="Sightseeing"
                                />
                                <InputField
                                    label="Time Required"
                                    type="text"
                                    value={tempActivity.timeRequired}
                                    onChange={(e) => setTempActivity({ ...tempActivity, timeRequired: e.target.value })}
                                    placeholder="3-4 Hours"
                                />
                                <div className="md:col-span-4">
                                    <button
                                        onClick={addActivity}
                                        className="px-6 py-2 bg-purple text-white rounded-lg transition"
                                    >
                                        Add Activity
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-8">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Services & Payment</h2>
                                <p className="text-gray-600">Service details and payment information</p>
                            </div>
                        </div>

                        {/* Scope of Service Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold color-purple">Scope of Service</h3>

                            {formData.scopeOfService.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-700">Added Services:</h4>
                                    {formData.scopeOfService.map((service, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1">
                                                <span className="font-medium">{service.service}</span>
                                                <div className="text-sm text-gray-600 mt-1">{service.details}</div>
                                            </div>
                                            <button
                                                onClick={() => removeScopeOfService(index)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-gray-200 rounded-lg">
                                <InputField
                                    label="Service"
                                    type="text"
                                    value={tempScopeOfService.service}
                                    onChange={(e) => setTempScopeOfService({ ...tempScopeOfService, service: e.target.value })}
                                    placeholder="e.g., Accommodation Services"
                                />
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Details</label>
                                    <textarea
                                        value={tempScopeOfService.details}
                                        onChange={(e) => setTempScopeOfService({ ...tempScopeOfService, details: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Service details..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        onClick={addScopeOfService}
                                        className="px-6 py-2 bg-purple text-white rounded-lg transition"
                                    >
                                        Add Service
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Inclusion Summary Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold color-purple">Inclusion Summary</h3>

                            {formData.inclusionSummary.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-700">Added Inclusions:</h4>
                                    {formData.inclusionSummary.map((inclusion, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1 grid grid-cols-4 gap-4">
                                                <div><span className="font-medium">Category:</span> {inclusion.category}</div>
                                                <div><span className="font-medium">Count:</span> {inclusion.count}</div>
                                                <div><span className="font-medium">Details:</span> {inclusion.details}</div>
                                                <div><span className="font-medium">Comments:</span> {inclusion.comments}</div>
                                            </div>
                                            <button
                                                onClick={() => removeInclusionSummary(index)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border border-gray-200 rounded-lg">
                                <InputField
                                    label="Category"
                                    type="text"
                                    value={tempInclusionSummary.category}
                                    onChange={(e) => setTempInclusionSummary({ ...tempInclusionSummary, category: e.target.value })}
                                    placeholder="Accommodation"
                                />
                                <InputField
                                    label="Count"
                                    type="text"
                                    value={tempInclusionSummary.count}
                                    onChange={(e) => setTempInclusionSummary({ ...tempInclusionSummary, count: e.target.value })}
                                    placeholder="5"
                                />
                                <InputField
                                    label="Details"
                                    type="text"
                                    value={tempInclusionSummary.details}
                                    onChange={(e) => setTempInclusionSummary({ ...tempInclusionSummary, details: e.target.value })}
                                    placeholder="Nights at hotels"
                                />
                                <InputField
                                    label="Comments"
                                    type="text"
                                    value={tempInclusionSummary.comments}
                                    onChange={(e) => setTempInclusionSummary({ ...tempInclusionSummary, comments: e.target.value })}
                                    placeholder="Twin sharing basis"
                                />
                                <div className="md:col-span-4">
                                    <button
                                        onClick={addInclusionSummary}
                                        className="px-6 py-2 bg-purple text-white rounded-lg transition"
                                    >
                                        Add Inclusion
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Payment Plan Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold color-purple">Payment Plan</h3>

                            {formData.paymentPlan.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-700">Added Payments:</h4>
                                    {formData.paymentPlan.map((payment, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1">
                                                <span className="font-medium">{payment.heading} - {payment.installment}</span>
                                                <div className="text-sm text-gray-600 mt-1">{payment.details}</div>
                                                <div className="text-sm font-medium mt-1">Amount: {payment.amount} | Due: {payment.dueDate}</div>
                                            </div>
                                            <button
                                                onClick={() => removePaymentPlan(index)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-gray-200 rounded-lg">
                                <InputField
                                    label="Heading"
                                    type="text"
                                    value={tempPaymentPlan.heading}
                                    onChange={(e) => setTempPaymentPlan({ ...tempPaymentPlan, heading: e.target.value })}
                                    placeholder="Booking Confirmation"
                                />
                                <InputField
                                    label="Installment"
                                    type="text"
                                    value={tempPaymentPlan.installment}
                                    onChange={(e) => setTempPaymentPlan({ ...tempPaymentPlan, installment: e.target.value })}
                                    placeholder="1st Installment"
                                />
                                <div className="md:col-span-2">
                                    <label className="text-gray-700 font-medium mb-2 block">Details</label>
                                    <textarea
                                        value={tempPaymentPlan.details}
                                        onChange={(e) => setTempPaymentPlan({ ...tempPaymentPlan, details: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        rows="2"
                                        placeholder="Payment details..."
                                    />
                                </div>
                                <InputField
                                    label="Amount"
                                    type="text"
                                    value={tempPaymentPlan.amount}
                                    onChange={(e) => setTempPaymentPlan({ ...tempPaymentPlan, amount: e.target.value })}
                                    placeholder="₹25,000"
                                />
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Due Date</label>
                                    <input
                                        type="date"
                                        value={tempPaymentPlan.dueDate}
                                        onChange={(e) => setTempPaymentPlan({ ...tempPaymentPlan, dueDate: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        onClick={addPaymentPlan}
                                        className="px-6 py-2 bg-purple text-white rounded-lg transition"
                                    >
                                        Add Payment
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Visa Details Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold color-purple">Visa Details</h3>

                            {formData.visaDetails.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-700">Added Visa Details:</h4>
                                    {formData.visaDetails.map((visa, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1 grid grid-cols-3 gap-4">
                                                <div><span className="font-medium">Type:</span> {visa.visaType}</div>
                                                <div><span className="font-medium">Validity:</span> {visa.validity}</div>
                                                <div><span className="font-medium">Processing:</span> {visa.processingDate}</div>
                                            </div>
                                            <button
                                                onClick={() => removeVisaDetail(index)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border border-gray-200 rounded-lg">
                                <InputField
                                    label="Visa Type"
                                    type="text"
                                    value={tempVisaDetail.visaType}
                                    onChange={(e) => setTempVisaDetail({ ...tempVisaDetail, visaType: e.target.value })}
                                    placeholder="Tourist Visa"
                                />
                                <InputField
                                    label="Validity"
                                    type="text"
                                    value={tempVisaDetail.validity}
                                    onChange={(e) => setTempVisaDetail({ ...tempVisaDetail, validity: e.target.value })}
                                    placeholder="30 Days"
                                />
                                <div>
                                    <label className="text-gray-700 font-medium mb-2 block">Processing Date</label>
                                    <input
                                        type="date"
                                        value={tempVisaDetail.processingDate}
                                        onChange={(e) => setTempVisaDetail({ ...tempVisaDetail, processingDate: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <button
                                        onClick={addVisaDetail}
                                        className="px-6 py-2 bg-purple text-white rounded-lg transition"
                                    >
                                        Add Visa Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 7:
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

            case 8:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-8">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold color-purple mb-2">Itinerary Summary</h2>
                                <p className="text-gray-600">Review your complete itinerary and generate PDF</p>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 mt-8">                         
                            <PDFPreview formData={formData} />
                        </div>

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
                    {/* Mobile Progress Bar */}
                    <div className="md:hidden mb-4">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex items-center space-x-2 min-w-max px-1 pb-2">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep === step.id;
                                    const isCompleted = currentStep > step.id;

                                    return (
                                        <div key={step.id} className="flex items-center flex-shrink-0">
                                            <div className="flex flex-col items-center min-w-[60px]">
                                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${isCompleted
                                                    ? 'bg-purple border-purple text-white'
                                                    : isActive
                                                        ? 'bg-purple border-purple text-white'
                                                        : 'bg-white border-gray-300 text-gray-400'
                                                    }`}>
                                                    {isCompleted ? <FaCheck size={10} /> : <Icon size={10} />}
                                                </div>
                                                <div className="mt-1 text-center">
                                                    <p className={`text-xs font-medium ${isActive ? 'color-purple' : isCompleted ? 'color-purple' : 'text-gray-400'}`}>
                                                        {step.title}
                                                    </p>
                                                </div>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-6 h-0.5 mx-1 flex-shrink-0 ${isCompleted ? 'bg-purple' : 'bg-gray-300'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Progress Bar */}
                    <div className="hidden md:block mb-4">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex items-center justify-between min-w-max">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep === step.id;
                                    const isCompleted = currentStep > step.id;

                                    return (
                                        <div key={step.id} className="flex items-center flex-1 min-w-[140px]">
                                            <div className="flex items-center">
                                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${isCompleted
                                                    ? 'bg-purple border-purple text-white'
                                                    : isActive
                                                        ? 'bg-purple border-purple text-white'
                                                        : 'bg-white border-gray-300 text-gray-400'
                                                    }`}>
                                                    {isCompleted ? <FaCheck size={14} /> : <Icon size={14} />}
                                                </div>
                                                <div className="ml-2 text-sm">
                                                    <p className={`font-medium whitespace-nowrap ${isActive ? 'color-purple' : isCompleted ? 'color-purple' : 'text-gray-400'}`}>
                                                        {step.title}
                                                    </p>
                                                </div>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`flex-1 h-0.5 mx-3 min-w-[20px] ${isCompleted ? 'bg-purple' : 'bg-gray-300'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
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
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        <FaArrowLeft />
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === steps.length}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${currentStep === steps.length
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-purple text-white hover:bg-purple-700'
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