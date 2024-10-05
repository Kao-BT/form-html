let userId; // ตัวแปรสำหรับเก็บ userId

document.addEventListener('DOMContentLoaded', function () {
  // ฟังก์ชันการส่งข้อมูลส่วนที่ 1
  const myUsersForm = document.getElementById('myUsers');
  if (myUsersForm) {
    myUsersForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          if (data.user_id) {
            userId = data.user_id; // เก็บ user_id ไว้เพื่อส่งในส่วนที่ 2 และ 3
            alert('ข้อมูลส่วนที่ 1 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
          } else {
            throw new Error('ไม่สามารถรับ user_id จากเซิร์ฟเวอร์ได้');
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาด:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 2
  const mySearchInfoForm = document.getElementById('mySearchInfo');
  if (mySearchInfoForm) {
    mySearchInfoForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // เพิ่ม user_id ลงในข้อมูลที่จะส่งไปส่วนที่ 2
      formObject.user_id = userId;

      fetch('http://localhost:3000/submit-form-part-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          alert('ข้อมูลส่วนที่ 2 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 3
  const mySocialIssuesForm = document.getElementById('mySocialIssues');
  if (mySocialIssuesForm) {
    mySocialIssuesForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {};

      // เก็บข้อมูลปัญหาสังคมที่เลือกทั้งหมดใน array
      const socialIssues = [];
      formData.forEach((value, key) => {
        if (key === 'social_issues') {
          socialIssues.push(parseInt(value)); // แปลงค่าเป็นตัวเลขและเก็บใน array
        } else {
          formObject[key] = value; // เก็บข้อมูลอื่น ๆ
        }
      });

      // เพิ่ม social_issues และ user_id ลงใน formObject
      formObject.social_issues = socialIssues;
      formObject.user_id = userId;

      fetch('http://localhost:3000/submit-form-part-3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          alert('ข้อมูลส่วนที่ 3 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 4
  const myAssistanceNeedsForm = document.getElementById('myAssistanceNeeds');
  if (myAssistanceNeedsForm) {
    myAssistanceNeedsForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {};

      // เก็บข้อมูลการช่วยเหลือที่เลือกทั้งหมดใน array
      const assistanceNeeds = [];
      formData.forEach((value, key) => {
        if (key === 'assistance_needs') {
          assistanceNeeds.push(parseInt(value)); // แปลงค่าเป็นตัวเลขและเก็บใน array
        } else {
          formObject[key] = value; // เก็บข้อมูลอื่น ๆ
        }
      });

      // เพิ่ม assistance_needs และ user_id ลงใน formObject
      formObject.assistance_needs = assistanceNeeds;
      formObject.user_id = userId;

      fetch('http://localhost:3000/submit-form-part-4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          alert('ข้อมูลส่วนที่ 4 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 5
  const myRiskAssessmentForm = document.getElementById('myRiskAssessment');
  if (myRiskAssessmentForm) {
    myRiskAssessmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {};

      // เก็บข้อมูลความเสี่ยงที่เลือกทั้งหมดใน array
      const risks = [];
      const details = {};

      formData.forEach((value, key) => {
        if (key.startsWith('check')) {
          risks.push(parseInt(value));  // ดึงค่า value จาก checkbox (1, 2, 3, ...)
        } else if (key.startsWith('input')) {
          details[key.replace('input', '')] = value;  // ดึงค่า textarea สำหรับรายละเอียด
        }
      });

      console.log('Selected risks:', risks); // ตรวจสอบข้อมูล risks ที่เก็บได้
      console.log('Risk details:', details); // ตรวจสอบรายละเอียดที่เก็บได้

      // ตรวจสอบว่ามีการเลือก checkbox อย่างน้อย 1 รายการ
      if (risks.length === 0) {
        alert('กรุณาเลือกความเสี่ยงอย่างน้อย 1 รายการ');
        return;
      }

      formObject.risks = risks;
      formObject.details = details;
      formObject.user_id = userId;

      // ส่งข้อมูลไปยัง API
      fetch('http://localhost:3000/submit-form-part-5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            alert('ข้อมูลส่วนที่ 5 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
          } else {
            alert(data.message);  // แสดงข้อความ error จากเซิร์ฟเวอร์
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 6
  const mySocialSupportForm = document.getElementById('mySocialSupportForm');
  if (mySocialSupportForm) {
    mySocialSupportForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {
        user_id: userId,
        social_support: formData.get('social_support')
      };

      fetch('http://localhost:3000/submit-form-part-6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('ข้อมูลส่วนที่ 6 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 7
  const myEvaluationForm = document.getElementById('myEvaluationForm');
  if (myEvaluationForm) {
    myEvaluationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {
        user_id: userId,
        evaluation: formData.get('evaluation')
      };

      fetch('http://localhost:3000/submit-form-part-7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('ข้อมูลส่วนที่ 7 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 8
  const myServiceTerminationForm = document.getElementById('myServiceTerminationForm');
  if (myServiceTerminationForm) {
    myServiceTerminationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {
        user_id: userId,
        topic: formData.get('topic_select'),
        free_text: formData.get('free_text') || ''
      };

      fetch('http://localhost:3000/submit-form-part-8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('ข้อมูลส่วนที่ 8 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 9
  const myFamilyEvaluationForm = document.getElementById('myFamilyEvaluationForm');
  if (myFamilyEvaluationForm) {
    myFamilyEvaluationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      const formObject = {
        user_id: userId,
        family_evaluation: formData.get('family_evaluation'),
        evaluation_score: formData.get('evaluation_score') || null
      };

      fetch('http://localhost:3000/submit-form-part-9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('ข้อมูลส่วนที่ 9 ถูกส่งไปยังเซิร์ฟเวอร์เรียบร้อยแล้ว');
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
    });
  }

  // ฟังก์ชันการส่งข้อมูลส่วนที่ 10
  const imageUploadForm = document.getElementById('imageUploadForm');
  if (imageUploadForm) {
    imageUploadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!userId) {
        alert('ไม่พบ user_id กรุณาส่งข้อมูลส่วนที่ 1 ก่อน');
        return;
      }

      const formData = new FormData(this);
      formData.append('user_id', userId);  // เพิ่ม user_id ลงใน FormData

      fetch('http://localhost:3000/submit-form-part-10', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('อัปโหลดรูปภาพสำเร็จ');
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการอัปโหลดไฟล์:', error);
        });
    });
  }

});

