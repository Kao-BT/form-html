const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // เพิ่มส่วนนี้เพื่อเรียกใช้ CORS
const path = require('path');

const app = express();
const port = 3000;

// เปิดใช้งาน CORS ให้กับทุก request
app.use(cors());

// ตั้งค่า Storage Engine ของ Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');  // เก็บไฟล์ในโฟลเดอร์ uploads
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // ตั้งชื่อไฟล์ใหม่
  }
});

const upload = multer({ storage: storage });


// เชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ใส่รหัสผ่าน MySQL ของคุณ
  database: 'form_data' // ชื่อฐานข้อมูลใน MySQL
});

// ตรวจสอบการเชื่อมต่อกับ MySQL
db.connect((err) => {
  if (err) {
    console.error('ไม่สามารถเชื่อมต่อกับฐานข้อมูล:', err);
    return;
  }
  console.log('เชื่อมต่อกับฐานข้อมูลสำเร็จ');
});

// ใช้ bodyParser เพื่ออ่านข้อมูลจากฟอร์ม
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// สร้าง API สำหรับรับข้อมูลจากฟอร์ม ***ส่วนที่ 1***
app.post('/submit-form', (req, res) => {
  console.log('Request received:', req.body); // ตรวจสอบข้อมูลที่ได้รับจากฟอร์ม

  const {
    date,
    hn,
    an,
    sn,
    prefix,
    fullname,
    idcard,
    birthdate,
    age,
    nationality,
    ethnicity,
    religion,
    marital_status,
    education,
    treatment_rights,
    occupation,
    phone,
    address
  } = req.body;

  // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
  if (!date || !hn || !fullname || !idcard || !phone) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
  }

  // สร้างคำสั่ง SQL สำหรับเก็บข้อมูลลง MySQL
  const query = `
    INSERT INTO users_data (date, hn, an, sn, prefix, fullname, idcard, birthdate, age, nationality, ethnicity, religion, marital_status, education, treatment_rights, occupation, phone, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // ส่งข้อมูลไปที่ MySQL
  db.query(query, [date, hn, an, sn, prefix, fullname, idcard, birthdate, age, nationality, ethnicity, religion, marital_status, education, treatment_rights, occupation, phone, address], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err); // แสดง error หากเกิดปัญหา
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }

    // ตอบกลับข้อมูลเมื่อสำเร็จ พร้อมส่ง user_id กลับไป
    res.json({ message: 'เก็บข้อมูลส่วนที่ 1 สำเร็จ', user_id: result.insertId });
  });
});

// สร้าง API สำหรับรับข้อมูลจากฟอร์ม ***ส่วนที่ 2***
app.post('/submit-form-part-2', (req, res) => {
  const {
    search_criteria,
    organization_input,
    department_input,
    admit_date,
    service_type,
    disease_input,
    type_input,
    specify_input,
    symptom_input,
    medical_fee,
    payment_ability,
    assistance,
    information_type,
    other_name,
    relationship,
    info_address,
    info_phone,
    monthly_income,
    income_source,
    source_input,
    debt_status,
    debt_amount,
    debt_source,
    user_id // เพิ่ม user_id เพื่อเชื่อมกับตาราง users_data
  } = req.body;

  // ตรวจสอบว่ามี user_id หรือไม่
  if (!user_id) {
    return res.status(400).json({ message: 'user_id จำเป็นสำหรับการเชื่อมโยงข้อมูล' });
  }

  // แปลงค่า admit_date ให้เป็น null หากไม่ได้รับข้อมูล (เพื่อหลีกเลี่ยงการบันทึก '0000-00-00')
  const admitDateValue = admit_date && admit_date !== '0000-00-00' ? admit_date : null;

  // SQL สำหรับเพิ่มข้อมูลลงในตาราง
  const query = `
    INSERT INTO search_info (search_criteria, organization_input, department_input, admit_date, service_type, disease_input, type_input, specify_input, symptom_input, medical_fee, payment_ability, assistance, information_type, other_name, relationship, info_address, info_phone, monthly_income, income_source, source_input, debt_status, debt_amount, debt_source, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // ส่งข้อมูลไปยังฐานข้อมูล
  db.query(query, [
    search_criteria, organization_input, department_input, admitDateValue, service_type, disease_input, type_input, specify_input, symptom_input, medical_fee, payment_ability, assistance, information_type, other_name, relationship, info_address, info_phone, monthly_income, income_source, source_input, debt_status, debt_amount, debt_source, user_id
  ], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ message: 'เก็บข้อมูลส่วนที่ 2 สำเร็จ' });
  });
});

// สร้าง API สำหรับรับข้อมูลจากฟอร์ม ***ส่วนที่ 3***
app.post('/submit-form-part-3', (req, res) => {
  const {
    user_id, // user_id สำหรับเชื่อมกับ users_data
    social_issues, // ข้อมูลปัญหาสังคมที่เลือกในรูปแบบ array
    free_text1, // สภาพปัญหาที่พบและบันทึกเพิ่มเติม
    free_text2  // การวางแผนการช่วยเหลือ ระยะสั้น / ระยะยาว
  } = req.body;

  // แปลง social_issues เป็น JSON string
  const socialIssuesJson = JSON.stringify(social_issues);

  // SQL สำหรับเพิ่มข้อมูลลงในตาราง social_issues_data
  const query = `
    INSERT INTO social_issues_data (user_id, social_issues, free_text1, free_text2)
    VALUES (?, ?, ?, ?)
  `;

  // ส่งข้อมูลไปยังฐานข้อมูล
  db.query(query, [user_id, socialIssuesJson, free_text1, free_text2], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ message: 'เก็บข้อมูลส่วนที่ 3 สำเร็จ' });
  });
});


// สร้าง API สำหรับรับข้อมูลจากฟอร์ม ***ส่วนที่ 4***
app.post('/submit-form-part-4', (req, res) => {
  const { user_id, assistance_needs } = req.body;

  // ตรวจสอบว่ามีข้อมูลการช่วยเหลือ
  if (!assistance_needs || assistance_needs.length === 0) {
    return res.status(400).send('กรุณาเลือกการช่วยเหลือตามสภาพปัญหา');
  }

  // สร้างคำสั่ง SQL เพื่อเก็บข้อมูลลงในฐานข้อมูล
  const query = `INSERT INTO assistance_needs (user_id, assistance_needs) VALUES (?, ?)`;

  // เก็บข้อมูลในรูปแบบ JSON (array ของตัวเลข)
  db.query(query, [user_id, JSON.stringify(assistance_needs)], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).send('เกิดข้อผิดพลาดในการเก็บข้อมูล');
    }
    res.json({ message: 'เก็บข้อมูลส่วนที่ 4 สำเร็จ' });
  });
});

// สร้าง API สำหรับรับข้อมูลจากฟอร์ม ***ส่วนที่ 5***
app.post('/submit-form-part-5', (req, res) => {
  const { risks, details, user_id } = req.body;

  if (!risks || risks.length === 0) {
    return res.status(400).json({ success: false, message: 'กรุณาเลือกความเสี่ยงอย่างน้อย 1 รายการ' });
  }

  // ต่อไปเป็นขั้นตอนการบันทึกข้อมูลลงใน database
  const sql = `INSERT INTO risk_assessment (user_id, risks, details) VALUES (?, ?, ?)`;
  const values = [user_id, JSON.stringify(risks), JSON.stringify(details)];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    return res.json({ success: true, message: 'บันทึกข้อมูลสำเร็จ' });
  });
});


// ส่วนที่ 6: การใช้แหล่งสนับสนุนทางสังคม ***ส่วนที่ 6***
app.post('/submit-form-part-6', (req, res) => {
  const { user_id, social_support } = req.body;

  if (!user_id || !social_support) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const query = `INSERT INTO social_support_info (user_id, social_support) VALUES (?, ?)`;

  db.query(query, [user_id, social_support], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ success: true, message: 'ข้อมูลส่วนที่ 6 ถูกบันทึกเรียบร้อยแล้ว' });
  });
});


// ส่วนที่ 7: การติดตามและประเมินผล
app.post('/submit-form-part-7', (req, res) => {
  const { user_id, evaluation } = req.body;

  if (!user_id || !evaluation) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const query = `INSERT INTO evaluation_info (user_id, evaluation) VALUES (?, ?)`;

  db.query(query, [user_id, evaluation], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ success: true, message: 'ข้อมูลส่วนที่ 7 ถูกบันทึกเรียบร้อยแล้ว' });
  });
});

// ส่วนที่ 8: ยุติการให้บริการ
app.post('/submit-form-part-8', (req, res) => {
  const { user_id, topic, free_text } = req.body;

  if (!user_id || !topic) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const query = `INSERT INTO service_termination (user_id, topic, free_text) VALUES (?, ?, ?)`;

  db.query(query, [user_id, topic, free_text || null], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ success: true, message: 'ข้อมูลส่วนที่ 8 ถูกบันทึกเรียบร้อยแล้ว' });
  });
});

// ส่วนที่ 9: การประเมินครอบครัว
app.post('/submit-form-part-9', (req, res) => {
  const { user_id, family_evaluation, evaluation_score } = req.body;

  if (!user_id || !family_evaluation) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const query = `INSERT INTO family_evaluation (user_id, evaluation_status, evaluation_score) VALUES (?, ?, ?)`;

  db.query(query, [user_id, family_evaluation, family_evaluation === 'yes' ? evaluation_score : null], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ success: true, message: 'ข้อมูลส่วนที่ 9 ถูกบันทึกเรียบร้อยแล้ว' });
  });
});

// ส่วนที่ 10: API สำหรับอัปโหลดรูปภาพ
app.post('/submit-form-part-10', upload.single('image_upload'), (req, res) => {
  const user_id = req.body.user_id;

  if (!req.file || !user_id) {
    return res.status(400).json({ success: false, message: 'กรุณาอัปโหลดไฟล์และระบุ user_id' });
  }

  const imagePath = req.file.path;

  const query = `INSERT INTO family_map (user_id, image_path) VALUES (?, ?)`;
  db.query(query, [user_id, imagePath], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเก็บข้อมูล:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเก็บข้อมูล' });
    }
    res.json({ success: true, message: 'อัปโหลดไฟล์สำเร็จ', imagePath });
  });
});




// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server กำลังทำงานที่ http://localhost:${port}`);
});
