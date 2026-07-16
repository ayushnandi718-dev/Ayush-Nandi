import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px 12px 0 0",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "white", margin: 0, fontSize: "24px" }}>
        New Message from Portfolio
      </h1>
    </div>
    <div
      style={{
        background: "#f8f9fa",
        borderRadius: "0 0 12px 12px",
        padding: "30px",
        border: "1px solid #e9ecef",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#6c757d", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 5px 0" }}>
          From
        </p>
        <p style={{ color: "#212529", fontSize: "18px", fontWeight: "bold", margin: 0 }}>
          {fullName}
        </p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#6c757d", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 5px 0" }}>
          Email
        </p>
        <a href={`mailto:${email}`} style={{ color: "#667eea", fontSize: "16px", textDecoration: "none" }}>
          {email}
        </a>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#6c757d", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 5px 0" }}>
          Message
        </p>
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "15px",
            border: "1px solid #e9ecef",
            color: "#212529",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          {message}
        </div>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #e9ecef", margin: "20px 0" }} />
      <p style={{ color: "#6c757d", fontSize: "12px", textAlign: "center", margin: 0 }}>
        Sent from Ayush Nandi&apos;s Portfolio Contact Form
      </p>
    </div>
  </div>
);
