SELECT 
  SUM(JSON_CONTAINS(social_issues, '1', '$')) AS ไม่มีปัญหาสังคม,
  SUM(JSON_CONTAINS(social_issues, '2', '$')) AS ปัญหาคู่สมรสและการครองเรือน,
  SUM(JSON_CONTAINS(social_issues, '3', '$')) AS ปัญหาระหว่างบิดา,
  SUM(JSON_CONTAINS(social_issues, '4', '$')) AS ปัญหาความแตกแยกในครอบครัว,
  SUM(JSON_CONTAINS(social_issues, '5', '$')) AS ปัญหาความสัมพันธ์ระหว่างเครือญาติ,
  SUM(JSON_CONTAINS(social_issues, '6', '$')) AS ปัญหาความรัก,
  SUM(JSON_CONTAINS(social_issues, '7', '$')) AS ปัญหาทางเพศ,
  SUM(JSON_CONTAINS(social_issues, '8', '$')) AS ปัญหาภาระในการดูแลผู้เจ็บ,
  SUM(JSON_CONTAINS(social_issues, '9', '$')) AS ปัญหาที่อยู่อาศัย,
  SUM(JSON_CONTAINS(social_issues, '10', '$')) AS ปัญหาที่เกิดจากบุคคลอื่นนอกครอบครัว,
  SUM(JSON_CONTAINS(social_issues, '11', '$')) AS ปัญหาการเงิน,
  SUM(JSON_CONTAINS(social_issues, '12', '$')) AS ปัญหาการศึกษา,
  SUM(JSON_CONTAINS(social_issues, '13', '$')) AS ปัญหาการประกอบอาชีพ,
  SUM(JSON_CONTAINS(social_issues, '14', '$')) AS ปัญหาทางกฎหมาย,
  SUM(JSON_CONTAINS(social_issues, '15', '$')) AS ปัญหาที่เป็นอุปสรรคต่อการดูแลสุขภาพผู้ป่วย,
  SUM(JSON_CONTAINS(social_issues, '16', '$')) AS ปัญหาความเชื่อ,
  SUM(JSON_CONTAINS(social_issues, '16', '$')) AS ปัญหาสารเสพติด,
  SUM(JSON_CONTAINS(social_issues, '16', '$')) AS ปัญหาที่เป็นปรากฏการณ์ทางสังคม
  
FROM social_issues_data;
