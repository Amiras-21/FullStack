import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={styles.container}>
     <img src='https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png' style={{ width: "100%",
        height: "500px",
        objectFit: "contain",}}></img>
      <a href="/login" style={styles.link}>Go back to Home</a>
    </div>
  )
}

const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
    },
    link: {
      fontSize: "18px",
      color: "#0070f3",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };