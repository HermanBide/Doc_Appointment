import User from '../models/UserSchema.js'; // Import User model
import Doctor from '../models/DoctorSchema.js'; // Import Doctor model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import JWT library
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });
}

export const register = async (req, res) => {
    const { email, name, photo, password, role, gender } = req.body;
    try {
        let user = null;

        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        // check if user exist 
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            user = new User({ email, password: hashPassword, name, photo, role, gender });
        } else if (role === 'doctor') {
            user = new Doctor({ email, password: hashPassword, name, photo, role, gender });
        }

        await user.save();
        res.status(200).json({ successful: true, message: 'User was successfully created' });

    } catch (error) {
        console.error("Error registering user:", error)
        res.status(500).json({ successful: false, message: "Failed to register user, try again", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;

        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }

        if (!user) {
            return res.status(404).json({ successful: false, message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ successful: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);
        const { role, appointments, ...rest } = user._doc;
        res.status(200).json({ success: true, message: "Successfully Logged In", token, data: { ...rest }, role, appointments });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ successful: false, message: "Failed to login user, try again", error: error.message });
    }
};


// import User from '../models/UserSchema.js'; // Import User model
// import Doctor from '../models/DoctorSchema.js'; // Import Doctor model
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken'; // Import JWT library
// import dotenv from 'dotenv';

// dotenv.config({ path: "./.env" });

// const generateToken = (user) => {
//     return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
//         expiresIn: '15d'
//     })
// }

// export const register = async (req, res) => {
//     const { email, name, photo, password, role, gender } = req.body;
//     try {
//         let user = null;
//         const response = await axios.post(
//             "http://localhost:4000/api/v1/auth/register",
//             {
//               method: "post",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(formData),
//             }
//           );
//         if (role === 'patient') {
//             user = await User.findOne({ email });
//         } else if (role === 'doctor') {
//             user = await Doctor.findOne({ email });
//         }
//         // check if user exist 
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         if (!password) {
//             return res.status(400).json({ message: 'Password is required' });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);

//         if (role === 'patient') {
//             user = new User({ email, password: hashPassword, name, photo, role, gender });
//         } else if (role === 'doctor') {
//             user = new Doctor({ email, password: hashPassword, name, photo, role, gender });
//         }

//         await user.save();
//         res.status(200).json({ successful: true, message: 'User was successfully created' });

//     } catch (error) {
//         console.error("Error registering user:", error)
//         res.status(500).json({ successful: false, message: "Failed to register user, try again", error: error.message });
//     }
// };

// export const login = async (req, res) => {
//     const { email } = req.body
//     try {
//         let user = null;

//         const patient = await User.findOne({ email })
//         const doctor = await Doctor.findOne({ email })
//         if (patient) {
//             user = patient
//         }
//         if (doctor) {
//             user = doctor
//         }

//         if (!user) {
//             res.status(404).json({ successful: false, message: "User not found" });
//         }

//         const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
//         if (!isPasswordMatch) {
//             return res.status(400).json({ status: false, message: "Invalid credentials" });
//         }

//         const token = generateToken(user)
//         const { role, appointments, ...rest } = user._doc
//         res.status(200).json({ success: true, message: "Successfully Logged In", token, data: { ...rest }, role, appointments })
//     } catch (error) {
//         console.error("Error registering user:", error)
//         res.status(500).json({ successful: false, message: "Failed to login user, try again", error: error.message });
//     }
// }

