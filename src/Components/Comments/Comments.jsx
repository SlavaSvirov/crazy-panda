import React from "react";
import styles from "./Comments.module.css";

// export const Comments = ({ sortedItems }) => {
//   const indexOfLastComment = currentPage * perPage;
//   const indexOfFirstComment = indexOfLastComment - perPage;
//   const currentComments = preparedItems.slice(
//     indexOfFirstComment,
//     indexOfLastComment
//   );

//   return (
//     <tbody>
//       {sortedItems.map((el) => {
//         return (
//           <tr className={styles.row}>
//             <td className="id">{el.id}</td>
//             <td className="name">{el.name}</td>
//             <td className="body">{el.body}</td>
//             <td className="email">{el.email}</td>
//           </tr>
//         );
//       })}
//     </tbody>
//   );
// };
