import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Or fetch if you prefer

interface ClassData {
  id: string;
  title: string;
  description: string;
  availableSpots: number;
}

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CLASS_MGMT_API_URL}/api/classes`);
        setClasses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <p>Loading classes...</p>;
  }

  return (
    <div>
      <h1>Available Classes</h1>
      {classes.length > 0 ? (
        <ul>
          {classes.map((classData) => (
            <li key={classData.id}>
              <h2>{classData.title}</h2>
              <p>{classData.description}</p>
              <p>Available Spots: {classData.availableSpots}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
};

export default Classes;
