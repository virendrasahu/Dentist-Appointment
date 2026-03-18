const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Dentist = require('./models/Dentist');
const Admin = require('./models/Admin');
const Appointment = require('./models/Appointment');
require('dotenv').config();

const dentists = [
    {
        name: "Dr. David Okafor",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=600",
        specialization: "DDS, MS - Prosthodontics",
        experience: 20,
        clinicName: "Okafor Dental Excellence",
        address: "987 Birch Street",
        location: "Atlanta, GA",
        availability: ['Monday', 'Tuesday', 'Wednesday']
    },
    {
        name: "Dr. Emily Roberts",
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600&h=600",
        specialization: "BDS, Certificate in Implantology",
        experience: 6,
        clinicName: "Sunrise Dental Clinic",
        address: "654 Cedar Boulevard",
        location: "Houston, TX",
        availability: ['Monday', 'Thursday', 'Friday']
    },
    {
        name: "Dr. James Cooper",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600&h=600",
        specialization: "DDS, FAGD",
        experience: 8,
        clinicName: "Cooper Family Dentistry",
        address: "456 Elm Avenue",
        location: "Los Angeles, CA",
        availability: ['Tuesday', 'Wednesday', 'Thursday']
    },
    {
        name: "Dr. Michael Chen",
        photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600&h=600",
        specialization: "DMD, MS - Endodontics",
        experience: 10,
        clinicName: "Chen Dental Studio",
        address: "321 Maple Lane",
        location: "San Francisco, CA",
        availability: ['Monday', 'Wednesday', 'Friday']
    },
    {
        name: "Dr. Priya Sharma",
        photo: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=600&h=600",
        specialization: "BDS, MDS - Periodontics",
        experience: 15,
        clinicName: "Pearl Dental Care",
        address: "789 Pine Road, Floor 3",
        location: "Chicago, IL",
        availability: ['Monday', 'Tuesday', 'Thursday']
    },
    {
        name: "Dr. Sarah Mitchell",
        photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600&h=600",
        specialization: "BDS, MDS - Orthodontics",
        experience: 12,
        clinicName: "Bright Smile Dental",
        address: "123 Oak Street, Suite 200",
        location: "New York, NY",
        availability: ['Tuesday', 'Wednesday', 'Friday']
    }
];

const seedDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://virendra2609vs_db_user:fqI6hcXSQoPlD3P0@cluster0.nciecfm.mongodb.net/?appName=Cluster0';
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // 1. Clear Collections
        await Dentist.deleteMany({});
        await Admin.deleteMany({});
        await Appointment.deleteMany({});
        
        // 2. Insert Dentists
        const insertedDentists = await Dentist.insertMany(dentists);
        
        // Find specific dentist to link to
        const drOkafor = insertedDentists.find(d => d.name === "Dr. David Okafor");

        // 3. Insert Appointments
        const appointments = [
            {
                patientName: "Virendra Sahu",
                age: 22,
                gender: "Male",
                dentistId: drOkafor._id,
                date: "2026-03-18",
                time: "10:00 AM",
                status: "Confirmed"
            },
            {
                patientName: "Virendra Sahu",
                age: 22,
                gender: "Male",
                dentistId: drOkafor._id,
                date: "2026-03-20",
                time: "02:30 PM",
                status: "Pending"
            }
        ];
        await Appointment.insertMany(appointments);

        // 4. Insert Default Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        await Admin.create({
            username: 'admin',
            password: hashedPassword,
            role: 'superadmin'
        });
        
        console.log('Database seeded successfully with DentalFlow data, Admin user, and Appointments');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
