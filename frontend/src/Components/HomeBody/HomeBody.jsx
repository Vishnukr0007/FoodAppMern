import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import './HomeBody.css';

const items = [
  { 
    name: "Pizza", 
    description: "Cheesy and delicious", 
    image: "https://images.pexels.com/photos/842519/pexels-photo-842519.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-red-500 to-red-300" 
  },
  { 
    name: "Burger", 
    description: "Juicy and flavorful", 
    image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-300" 
  },
  { 
    name: "Sushi", 
    description: "Fresh and healthy", 
    image: "https://images.pexels.com/photos/3147493/pexels-photo-3147493.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-green-500 to-green-300" 
  },
  { 
    name: "Ice Cream", 
    description: "Sweet and creamy", 
    image: "https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-blue-500 to-blue-300" 
  },
  { 
    name: "Pasta", 
    description: "Rich and savory", 
    image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-orange-500 to-orange-300" 
  },
  { 
    name: "Cocktail", 
    description: "Refreshing and vibrant", 
    image: "https://images.pexels.com/photos/1189261/pexels-photo-1189261.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-pink-500 to-pink-300" 
  },
  { 
    name: "Coffee", 
    description: "Rich and aromatic", 
    image: "https://images.pexels.com/photos/437716/pexels-photo-437716.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-brown-500 to-brown-300" 
  },
  { 
    name: "Tea", 
    description: "Soothing and warm", 
    image: "https://images.pexels.com/photos/1872893/pexels-photo-1872893.jpeg?auto=compress&cs=tinysrgb&w=600", 
    gradient: "bg-gradient-to-r from-green-600 to-green-400" 
  },
];

function HomeBody() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Discover Delicious Food and Refreshing Drinks
      </h1>
      <Row>
        {items.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="rounded-2xl shadow-xl card-fixed-size bg-black card-title-hover" >
              <div className={`relative ${item.gradient} rounded-2xl`}>
                <Card.Img 
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  className="w-100 h-100 object-cover opacity-90 rounded-2xl"
                />
                <div className="absolute inset-0 bg-dark bg-opacity-40 rounded-2xl"></div>
                <Card.Body className="p-4 relative z-10">
                  <Card.Title className="text-xl font-bold text-white mb-2 card-title-hover">{item.name}</Card.Title>
                  <Card.Text className="text-sm text-white card-text-hover ">{item.description}</Card.Text>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeBody;
