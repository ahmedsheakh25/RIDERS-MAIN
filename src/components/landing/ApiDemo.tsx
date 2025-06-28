import React, { useEffect, useState, useRef } from 'react';
const ApiDemo: React.FC = () => {
  const demoRef = useRef<HTMLDivElement>(null);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const codeSnippets = [{
    language: 'javascript',
    title: 'Create a Delivery',
    code: `// Create a new delivery request
const delivery = await api.deliveries.create({
  pickup: {
    address: "Block 4, Street 23, Kuwait City",
    contactName: "John Doe",
    phone: "+965 9876 5432"
  },
  dropoff: {
    address: "Salmiya, Block 10, Street 5",
    contactName: "Jane Smith",
    phone: "+965 1234 5678"
  },
  packageDetails: {
    weight: 2.5,
    dimensions: "30x20x15",
    description: "Fragile items"
  },
  serviceType: "same_day"
});
console.log(\`Delivery created: \${delivery.id}\`);`
  }, {
    language: 'javascript',
    title: 'Track a Delivery',
    code: `// Track a delivery by ID
const trackDelivery = async (deliveryId) => {
  const status = await api.deliveries.track(deliveryId);
  console.log(\`Status: \${status.currentStatus}\`);
  console.log(\`Location: \${status.currentLocation.lat}, \${status.currentLocation.lng}\`);
  console.log(\`ETA: \${status.estimatedArrival}\`);
  return status;
};
// Update UI with delivery status
const updateTrackingUI = (status) => {
  mapElement.updateCourierLocation(
    status.currentLocation.lat,
    status.currentLocation.lng
  );
};
// Poll for updates every 30 seconds
setInterval(async () => {
  const status = await trackDelivery("DEL-12345");
  updateTrackingUI(status);
}, 30000);`
  }, {
    language: 'javascript',
    title: 'Webhook Integration',
    code: `// Set up a webhook to receive delivery updates
app.post('/webhook/delivery', (req, res) => {
  const { event, data } = req.body;
  switch (event) {
    case 'delivery.created':
      console.log(\`New delivery created: \${data.id}\`);
      notifyCustomer(data.customer, 'Your delivery has been created');
      break;
    case 'delivery.pickup_complete':
      console.log(\`Pickup completed for: \${data.id}\`);
      notifyCustomer(data.customer, 'Your package has been picked up');
      break;
    case 'delivery.in_progress':
      console.log(\`Delivery in progress: \${data.id}\`);
      updateDeliveryStatus(data.id, 'in_progress');
      break;
    case 'delivery.completed':
      console.log(\`Delivery completed: \${data.id}\`);
      notifyCustomer(data.customer, 'Your delivery is complete!');
      completeOrder(data.orderId);
      break;
  }
  res.status(200).send('Webhook received');
});`
  }];
  useEffect(() => {
    const demo = demoRef.current;
    if (!demo) return;
    // Auto-rotate code snippets
    const interval = setInterval(() => {
      setCurrentSnippet(prev => (prev + 1) % codeSnippets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  // Typing animation effect
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    const code = codeSnippets[currentSnippet].code;
    setDisplayedCode('');
    setIsTyping(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(prev => prev + code.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 15);
    return () => clearInterval(typingInterval);
  }, [currentSnippet]);
  return <div ref={demoRef} className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
      {/* Code editor header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm">
          {codeSnippets[currentSnippet].title}
        </div>
        <div className="text-gray-500 text-xs">api.js</div>
      </div>
      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 flex">
        {codeSnippets.map((snippet, index) => <button key={index} className={`px-4 py-2 text-sm ${index === currentSnippet ? 'text-white border-b-2 border-congress-blue-500' : 'text-gray-400 hover:text-gray-200'}`} onClick={() => setCurrentSnippet(index)}>
            {snippet.title}
          </button>)}
      </div>
      {/* Code content */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed">
        <pre className="text-white">
          <code>
            {displayedCode}
            {isTyping && <span className="inline-block w-2 h-4 bg-white animate-pulse"></span>}
          </code>
        </pre>
      </div>
      {/* Status bar */}
      <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 flex justify-between">
        <span>JavaScript</span>
        <span>UTF-8</span>
        <span>API v2.3.0</span>
      </div>
    </div>;
};
export default ApiDemo;