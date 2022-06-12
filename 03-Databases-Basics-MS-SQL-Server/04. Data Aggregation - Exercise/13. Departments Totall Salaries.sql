SELECT e.DepartmentID,
	   SUM(e.Salary) AS [TotalSalary]
FROM Employees e
GROUP BY e.DepartmentID
ORDER BY e.DepartmentID