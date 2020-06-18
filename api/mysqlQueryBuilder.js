const UPDATE_DATE = `
UPDATE customer
SET create_date=DATE_FORMAT(create_date,'2005-%m-%d %T');
UPDATE actor_copy
SET last_update =  CONCAT('2020-',floor(1+RAND()*12),'-',FLOOR(1+RAND()*27));`;

const TOTAL_REVENUE = `
SELECT  
SUM(amount)AS total,
SUM(
  case YEAR(date(payment_date))
    when YEAR( CURDATE()) 
    then amount
    ELSE 0
  END) AS total_revenue_current_year,
SUM(
  case MONTH(date(payment_date))
    when MONTH( CURDATE()) 
    then amount
    ELSE 0
  END) AS total_revenue_this_month,
SUM(
  case YEARWEEK(date(payment_date))
    when YEARWEEK( CURDATE()) 
    then amount
    ELSE 0
  END) AS total_revenue_this_week,
SUM(
  case date(payment_date)
    when CURDATE()
    then amount
  ELSE 0
 end) AS total_revenue_today
 FROM payment;`;
const TOTAL_ORDERS = `
SELECT  
SUM(amount)AS total,
SUM(
  case YEAR(date(payment_date))
    when YEAR( CURDATE()) 
    then 1
    ELSE 0
  END) AS total_orders_current_year,
SUM(
  case MONTH(date(payment_date))
    when MONTH( CURDATE()) 
    then 1
    ELSE 0
  END) AS total_orders_this_month,
SUM(
  case YEARWEEK(date(payment_date))
    when YEARWEEK( CURDATE()) 
    then 1
    ELSE 0
  END) AS total_orders_this_week,
SUM(
  case date(payment_date)
    when CURDATE()
    then 1
  ELSE 0
 end) AS total_orders_today
 FROM payment;
`;
const TOTAL_CUSTOMERS = `
SELECT  
COUNT(*) AS total_customers,
COUNT(case when (gender='F') then 1 end) AS total_female_customers,
COUNT(case when (gender='M') then 1 end)AS total_male_customers,
COUNT(case when YEAR(date(create_date))=YEAR(CURDATE()) 
    then 1
  END) AS total_customers_current_year,
  
  COUNT(
  case 
  when YEAR(date(create_date))= YEAR( CURDATE()) 
  AND (gender='F')
    then 1
  END) AS total_female_customers_current_year,
  
  COUNT(
  case 
  when YEAR(date(create_date))=YEAR( CURDATE()) 
  AND (gender='M')
    then 1
  END) AS total_male_customers_current_year,
  
  
  COUNT(case when MONTH(date(create_date))=MONTH(CURDATE()) 
    then 1
  END) AS total_customers_this_month,
  
  COUNT(
  case 
  when MONTH(date(create_date))= MONTH(CURDATE()) 
  AND (gender='F')
    then 1
  END) AS total_female_customers_this_month,
  
  COUNT(
  case 
  when MONTH(date(create_date))=MONTH( CURDATE()) 
  AND (gender='M')
    then 1
  END) AS total_male_customers_this_month,

COUNT(case when YEARWEEK(date(create_date))=YEARWEEK( CURDATE()) 
    then 1
  END) AS total_customers_this_week,
  
  COUNT(
  case 
  when YEARWEEK(date(create_date))= YEARWEEK( CURDATE()) 
  AND (gender='F')
    then 1
  END) AS total_female_customers_this_week,
  
  COUNT(
  case 
  when YEARWEEK(date(create_date))=YEARWEEK( CURDATE() )
  AND (gender='M')
    then 1
  END) AS total_male_customers_this_week,
  
COUNT(
  case when date(create_date)=CURDATE()
    then 1
end) AS total_customers_today,
 
 COUNT(
  case 
  when date(create_date)=CURDATE() 
  AND (gender='F')
    then 1
 end) AS total_female_customers_today,
 
 COUNT(case 
  when date(create_date)=CURDATE()
  AND (gender='M')
    then 1
 end) AS total_male_customers_today
 FROM customer;
 `;

// const DAY_ORDERS = (givenYear) => {
//   let diff = 1;
//   if (givenYear) {
//     const now = new Date();
//     let current_year = now.getFullYear();
//     diff = current_year - year;
//   }
//   return `SELECT DAYNAME(payment_date) AS day_name, DATE(payment_date) as date,
//    COUNT(*) AS total_count
//    FROM payment
//    WHERE DAYNAME(date(payment_date))=DAYNAME( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))
//    GROUP BY date(payment_date), day_name;`;
// };
// const DAY_REVENUE = (givenYear) => {
//   let diff = 1;
//   if (givenYear) {
//     const now = new Date();
//     let current_year = now.getFullYear();
//     diff = current_year - year;
//   }
//   return `SELECT DAYNAME(payment_date) AS day_name,date(payment_date) as date,
//    SUM(amount) as revenue
//    FROM payment
//    WHERE DAYNAME(date(payment_date))=DAYNAME( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))
//    GROUP BY date(payment_date),day_name;`;
// };
// const DAY_CUSTOMERS = (givenYear) => {
// let diff = 1;
// if (givenYear) {
//   const now = new Date();
//   let current_year = now.getFullYear();
//   diff = current_year - year;
// }
// return `SELECT DAYNAME(create_date) AS day_name, DATE(create_date) as date,
//  count(case when gender='F' then 1 end) as female_cnt,
//  count(case when gender='M' then 1 end) as male_cnt,
//  COUNT(*) AS total_count
//  FROM customer
//  WHERE DAYNAME(date(create_date))=DAYNAME( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))
//  GROUP BY date(create_date), day_name;`;
// };
const WEEK_REVENUE = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - year;
  }

  let sql = `
SELECT DAYNAME(payment_date) AS day_name,date(payment_date) as date,
SUM(amount) as revenue
FROM payment
WHERE YEARWEEK(date(payment_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))  
GROUP BY date(payment_date),day_name;`;
  return sql;
};
const WEEK_CUSTOMERS = (givenYear) => {
  let diff = 1;

  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - year;
  }

  let sql = `
SELECT DAYNAME(create_date) AS day_name, DATE(create_date) as date,
count(case when gender='F' then 1 end) as female_cnt,
count(case when gender='M' then 1 end) as male_cnt,
COUNT(*) AS total_count
FROM customer
WHERE YEARWEEK(date(create_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR)) 
GROUP BY date(create_date), day_name;`;
  return sql;
};

const WEEK_ORDERS = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - year;
  }
  return `
SELECT DAYNAME(payment_date) AS day_name, DATE(payment_date) as date,
COUNT(*) AS total_count
FROM payment
WHERE YEARWEEK(date(payment_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))  
GROUP BY date(payment_date), day_name;`;
};

const MONTH_REVENUE = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - year;
  }
  return `
SELECT MONTH(payment_date) AS month_num,
SUM(amount) as revenue
FROM payment
WHERE year(date(payment_date))=year( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))  
GROUP BY MONTH(payment_date);
`;
};
const MONTH_CUSTOMERS = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - givenYear;
  }
  let sql = `
SELECT MONTH(create_date) AS month_num,
count(case when gender='F' then 1 end) as female_cnt,
count(case when gender='M' then 1 end) as male_cnt,
COUNT(*) AS total_customers
FROM customer
WHERE year(date(create_date))=year( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))  
GROUP BY MONTH(create_date);
`;
  return sql;
};
const MONTH_ORDERS = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - givenYear;
  }
  return `
SELECT MONTH(payment_date) AS month_num,
COUNT(*) AS total_orders
FROM payment
WHERE year(date(payment_date))=year( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))  
GROUP BY MONTH(payment_date);
`;
};
const YEAR_REVENUE = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - givenYear;
  }
  return `
SELECT YEAR(payment_date) AS year_num,
SUM(amount) as revenue
FROM payment
where YEAR(payment_date)=year( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))
GROUP BY YEAR(payment_date);
`;
};
const YEAR_CUSTOMERS = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - givenYear;
  }
  return `
SELECT YEAR(create_date) AS year_num,
count(case when gender='F' then 1 end) as female_cnt,
count(case when gender='M' then 1 end) as male_cnt,
COUNT(*) AS total_customers
FROM customer
where YEAR(create_date)=year( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))
GROUP BY YEAR(create_date);
`;
};
const YEAR_ORDERS = (givenYear) => {
  let diff = 1;
  if (givenYear) {
    const now = new Date();
    let current_year = now.getFullYear();
    diff = current_year - givenYear;
  }
  return `
SELECT YEAR(payment_date) AS year_num,
COUNT(*) AS total_orders
FROM payment
where YEAR(payment_date)=year( DATE_SUB(CURDATE(),INTERVAL ${diff} YEAR))
GROUP BY YEAR(payment_date);
`;
};

const TOP_10 = `
SELECT
c.name AS category, SUM(p.amount) AS total_sales
FROM payment AS p
INNER JOIN rental AS r ON p.rental_id = r.rental_id
INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id
INNER JOIN film AS f ON i.film_id = f.film_id
INNER JOIN film_category AS fc ON f.film_id = fc.film_id
INNER JOIN category AS c ON fc.category_id = c.category_id
GROUP BY c.name
ORDER BY total_sales DESC
LIMIT 10;

SELECT
concat(a.first_name,' ', a.last_name) AS actor_name
, SUM(p.amount) AS total_sales
FROM payment AS p
INNER JOIN rental AS r ON p.rental_id = r.rental_id
INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id
INNER JOIN film AS f ON i.film_id = f.film_id
INNER JOIN film_actor AS fa ON f.film_id=fa.film_id
INNER JOIN actor AS a ON fa.actor_id=a.actor_id
GROUP BY a.first_name, a.last_name
ORDER BY total_sales DESC
LIMIT 10;

SELECT
f.title AS title, SUM(p.amount) AS total_sales
FROM payment AS p
INNER JOIN rental AS r ON p.rental_id = r.rental_id
INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id 
INNER JOIN film AS f ON i.film_id = f.film_id
GROUP BY title
ORDER BY total_sales DESC
LIMIT 10;
`;

module.exports = {
  TOP_10,
  TOTAL_REVENUE,
  TOTAL_CUSTOMERS,
  TOTAL_ORDERS,
  YEAR_ORDERS,
  YEAR_REVENUE,
  YEAR_CUSTOMERS,
  MONTH_ORDERS,
  MONTH_REVENUE,
  MONTH_CUSTOMERS,
  WEEK_ORDERS,
  WEEK_REVENUE,
  WEEK_CUSTOMERS,
  // DAY_ORDERS,
  // DAY_REVENUE,
  // DAY_CUSTOMERS,
};
