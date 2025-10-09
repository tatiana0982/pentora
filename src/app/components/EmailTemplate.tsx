export function EmailTemplate({
  companyLogo = "https://example.com/logo.png",
  scanDate = "October 9, 2025",
  recipientName = "John Doe",
  scopeOrEnvironment = "Production Environment",
  criticalCount = 3,
  highCount = 5,
  mediumLowCount = 8,
  asset1Name = "api.example.com",
  asset1Host = "192.168.1.10",
  asset1Critical = 2,
  asset1High = 3,
  asset1Medium = 1,
  recipientEmail = "user@example.com",
}) {
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
        <title>Vulnerability Scan Result</title>
      </head>

      <body style={{ backgroundColor: "#0a0a0f", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
          <tbody>
            <tr>
              <td align="center" style={{ padding: "32px 16px" }}>
                <table
                  width="600"
                  style={{
                    backgroundColor: "#1a1a2e",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(138,43,226,0.3)",
                    border: "1px solid #2d2d44",
                  }}
                >
                  {/* Header */}
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "20px 24px",
                          background:
                            "linear-gradient(135deg,#6b2dd8,#9b4dca,#c471ed)",
                          color: "#fff",
                        }}
                      >
                        <table width="100%" role="presentation">
                          <tbody>
                            <tr>
                              <td align="left">
                                <img
                                  src={companyLogo}
                                  alt="Company Logo"
                                  width="140"
                                  style={{
                                    display: "block",
                                    maxWidth: "140px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                              <td align="right" style={{ fontSize: "14px" }}>
                                Vulnerability Scan Result
                                <div style={{ fontSize: "12px", opacity: 0.9 }}>
                                  Scan date: {scanDate}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Summary */}
                    <tr>
                      <td style={{ padding: "20px 24px" }}>
                        <h2 style={{ color: "#e0e0ff", marginBottom: "8px" }}>
                          Scan Summary
                        </h2>
                        <p style={{ color: "#b8b8d1", lineHeight: 1.5 }}>
                          Hello {recipientName},<br />
                          We completed the vulnerability scan for{" "}
                          <strong style={{ color: "#c471ed" }}>
                            {scopeOrEnvironment}
                          </strong>
                          . Below is a summary of the findings and recommended next steps.
                        </p>

                        {/* Severity Stats */}
                        <table
                          width="100%"
                          style={{
                            marginTop: "16px",
                            background: "#0f0f1e",
                            borderRadius: "6px",
                            border: "1px solid #2d2d44",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "center", padding: "8px" }}>
                                <div style={{ color: "#ff4d6d", fontWeight: 700 }}>
                                  {criticalCount}
                                </div>
                                <div style={{ color: "#9ca3af", fontSize: "12px" }}>
                                  Critical
                                </div>
                              </td>
                              <td style={{ textAlign: "center", padding: "8px" }}>
                                <div style={{ color: "#ffb347", fontWeight: 700 }}>
                                  {highCount}
                                </div>
                                <div style={{ color: "#9ca3af", fontSize: "12px" }}>
                                  High
                                </div>
                              </td>
                              <td style={{ textAlign: "center", padding: "8px" }}>
                                <div style={{ color: "#5eead4", fontWeight: 700 }}>
                                  {mediumLowCount}
                                </div>
                                <div style={{ color: "#9ca3af", fontSize: "12px" }}>
                                  Medium / Low
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Assets */}
                    <tr>
                      <td style={{ padding: "0 24px 20px 24px" }}>
                        <h3 style={{ color: "#e0e0ff" }}>Top Affected Assets</h3>
                        <table
                          width="100%"
                          cellPadding="8"
                          style={{
                            border: "1px solid #2d2d44",
                            borderRadius: "6px",
                            overflow: "hidden",
                            background: "#1a1a2e",
                          }}
                        >
                          <thead>
                            <tr style={{ background: "#0f0f1e", color: "#e0e0ff" }}>
                              <th>Asset</th>
                              <th>IP / Host</th>
                              <th>Critical</th>
                              <th>High</th>
                              <th>Medium</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ color: "#b8b8d1" }}>
                              <td>{asset1Name}</td>
                              <td>{asset1Host}</td>
                              <td>{asset1Critical}</td>
                              <td>{asset1High}</td>
                              <td>{asset1Medium}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Critical Findings */}
                    <tr>
                      <td style={{ padding: "0 24px 20px 24px" }}>
                        <h3 style={{ color: "#e0e0ff" }}>Critical Findings (Top 3)</h3>
                        <table
                          width="100%"
                          style={{
                            borderRadius: "6px",
                            background: "#1a1a2e",
                            border: "1px solid #2d2d44",
                            position: "relative",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  fontSize: "14px",
                                  color: "#4a4a5e",
                                  padding: "40px 20px",
                                  textAlign: "center",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    filter: "blur(2.6px)",
                                    userSelect: "none",
                                    pointerEvents: "none",
                                    opacity: 0.3,
                                  }}
                                >
                                  <strong>
                                    CVE-2024-XXXXX - Critical Remote Code Execution
                                  </strong>
                                  <div style={{ marginTop: "8px" }}>
                                    Wow, you really tried to unblur this?
                                  </div>
                                  <div style={{ marginTop: "8px" }}>
                                    <strong>Affected:</strong> Your patience
                                  </div>
                                </div>

                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "#fff",
                                    fontWeight: 600,
                                  }}
                                >
                                  <i className="bx bx-lock"></i> Details Available After
                                  Meeting
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            textAlign: "center",
                            fontStyle: "italic",
                          }}
                        >
                          Critical findings will be shared in detail during our scheduled discussion.
                        </p>
                      </td>
                    </tr>

                    {/* CTA */}
                    <tr>
                      <td style={{ textAlign: "center", padding: "0 24px 28px 24px" }}>
                        <a
                          href="https://cal.com/trypentora/protect-your-company-pentora-security-team"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: "inline-block",
                            padding: "12px 22px",
                            borderRadius: "8px",
                            fontWeight: 600,
                            background:
                              "linear-gradient(135deg,#6b2dd8,#9b4dca)",
                            color: "#fff",
                            boxShadow: "0 4px 12px rgba(107,45,216,0.4)",
                          }}
                        >
                          Schedule a Discussion
                        </a>
                        <div style={{ marginTop: "12px", color: "#9ca3af", fontSize: "13px" }}>
                          Or reply to this email with your preferred time.
                        </div>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          padding: "12px 18px",
                          background: "#0f0f1e",
                          color: "#6b7280",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        This message was sent to{" "}
                        <strong style={{ color: "#9ca3af" }}>{recipientEmail}</strong>.
                        <div style={{ marginTop: "6px" }}>
                          &copy; 2025, ENCODERSPRO PVT. LTD. All rights reserved.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
