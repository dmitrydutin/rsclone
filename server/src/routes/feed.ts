// import { Router } from 'express';
// import util from 'util';

// const router = Router();

// router.get('/allposts', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             return res.status(500).json({ message: err.message, err });
//         }

//         const query = 'SELECT * FROM posts';
//         const queryUser = 'SELECT * FROM users WHERE id = ?';
//         connection.query(query, async (error, results) => {
            

//             if (error) {
//                 return res.status(500).json({ message: error.message, error });
//             }
//             //resultsArray=resultsArray.concat(res.json(results));

//             // resultsArray.forEach((element) => {
//             //     console.log(element);
//             // });
//             //console.log(res.json(results), typeof resultsArray);
//             //const query = 'SELECT * FROM employees WHERE id = 'user_id';'
//             //return resultsArray;
//             let resultsArray = JSON.parse(JSON.stringify(results));
//             // buildString(connection, queryUser, resultsArray).then(() => {
//             //     addUserInfo(connection, queryUser, resultsArray).then((o) => {
//             //         console.log(o);
//             //         //return res.json(o);
//             //     });
//             // });
            

//             // connection.query(queryUser, [resultsArray[0].user_id], (err, ress) => {
//             //     // Object.assign(element, JSON.parse(JSON.stringify(ress[0])));
//             //     resultsArray[0].login = JSON.parse(JSON.stringify(ress[0])).login;
//             //     resultsArray[0].avatar = JSON.parse(JSON.stringify(ress[0])).avatar;
//             //     //console.log(resultsArray[0], ress);
//             //     return res.json([resultsArray[0]]);
//             // });


//             const queryTest = util.promisify(connection.query).bind(connection);

//             (async () => {
//                 try {
                    
//                     const resultsTest = await resultsArray.map((el) => {
//                         return queryTest(queryUser, [el.user_id]);
//                     });                   
                    
//                     const results = await Promise.allSettled(resultsTest);
//                     connection.release();
//                     let test = [];
//                     for (let i = 0; i < Number(results.length); i++) {
//                         test.push(results[i]);
//                     }
//                     test = test.map((el, ind) => {
//                         return Object.assign(resultsArray[ind], el.value[0]);
//                     });
                   
//                     return res.json(test);
//                 } finally {
//                     connection.release();
//                 }
//             })();
            
//         });
//     });
// });

// export default router;
