SELECT COUNT(*) AS total
FROM social_issues_data
WHERE JSON_CONTAINS(social_issues, '11', '$');
