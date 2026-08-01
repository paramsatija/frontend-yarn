# YARN Protocol — Privacy, Security & Data Policy

**Effective Date:** July 14, 2025
**Version:** 1.0
**Classification:** Public Policy Document

---

## 1. Introduction

YARN Protocol is designed and operated using internationally recognized privacy, security, and governance principles. This policy documents our commitment to privacy by design, security by default, and user sovereignty across all platform operations.

This policy supports compliance with major global data protection frameworks including the EU General Data Protection Regulation (GDPR), UK GDPR, California Consumer Privacy Act (CCPA/CPRA), and other applicable privacy regulations. Compliance is achieved through platform architecture rather than policy alone.

---

## 2. Privacy by Design

Privacy is embedded into every component of the platform from initial design through deployment.

### Principles
- Collect only the minimum data required for platform functionality
- Never collect unnecessary personal information
- Process only data required for legitimate operational purposes
- Apply pseudonymisation where appropriate
- Minimize data retention periods
- Conduct Privacy Impact Assessments for all new features

### Implementation
All engineering teams must complete a Privacy Review Checklist before deploying any feature that:
- Collects new categories of user data
- Changes data processing workflows
- Introduces new third-party integrations
- Modifies authentication or authorization systems

---

## 3. User Data Sovereignty

Users remain the exclusive owners of all their data.

### User-Owned Data
- Portfolio data and trading history
- Exchange API credentials and configuration
- Personal information provided during registration
- User-defined configuration settings and risk parameters
- Evidence generated from user actions

### User Rights
Users may, at any time:
- **Access:** Request a complete export of all data associated with their account
- **Export:** Download portfolio data, trading history, and configuration in standard formats (JSON, CSV)
- **Delete:** Request deletion of personal data (subject to legal retention requirements)
- **Revoke:** Disconnect execution nodes and revoke API permissions instantly
- **Modify:** Update or correct any personal information

### Data Portability
All user data is provided in machine-readable formats to support migration to other platforms. YARN Protocol does not lock users into proprietary data formats.

---

## 4. Local Execution Architecture

The YRN Execution Node operates as a privacy-preserving execution layer.

### Local Processing
- API keys remain within the user's YRN Execution Node deployment
- Trading decisions and portfolio execution occur locally in the user's environment
- Sensitive credentials are never transmitted to or stored on central YARN servers
- Portfolio execution logic runs under user control, not YARN control

### Central Services (Limited)
Central YARN services receive only:
- Anonymized portfolio performance metrics (for platform intelligence improvement)
- Aggregated, non-identifiable usage statistics
- Diagnostic information (with user consent)

### Deployment Options
Users may deploy their YRN Execution Node:
- On personal hardware (self-hosted)
- In private cloud infrastructure (AWS, GCP, Azure)
- In secure institutional data centers
- No requirement to use YARN-managed infrastructure

---

## 5. Data Minimization

The platform collects information only when necessary for:

### Authentication & Identity
- Email address (for account creation and communication)
- Multi-factor authentication credentials
- Wallet address (for YRN token operations)

### Platform Functionality
- Connected exchange names (not credentials)
- User-defined risk parameters and configuration
- Portfolio performance metrics (for intelligence generation)

### Security
- IP addresses (for fraud detection, retained 30 days)
- Session tokens (for authentication, retained until logout)
- Audit logs (for security monitoring, retained 90 days)

### Diagnostics (Optional, with consent)
- Error reports
- Performance metrics
- Usage patterns (anonymized)

### What We Never Collect
- Exchange API credentials (never leave user's node)
- Private keys or seed phrases
- Government identification documents
- Financial account numbers (beyond exchange connections)
- Biometric data
- Precise geolocation data
- Contacts or social graph information

---

## 6. Encryption

All sensitive information is protected using industry-standard encryption.

### Data in Transit
- TLS 1.3 for all network communications
- Certificate pinning for mobile and desktop applications
- Perfect forward secrecy enabled

### Data at Rest
- AES-256 encryption for all stored data
- Encryption keys managed via hardware security modules (HSMs)
- Regular key rotation (90-day cycle)

### API Credentials
- User exchange credentials encrypted with user-managed keys
- YARN Protocol cannot decrypt user API credentials
- Credential rotation reminders sent to users

### Authentication Tokens
- Short-lived JWT tokens (15-minute expiry)
- Refresh token rotation on every use
- Secure httpOnly, SameSite=Strict cookie flags

### Backup Storage
- Encrypted backups with separate key management
- Off-site disaster recovery with encrypted replication
- Regular backup restoration testing

---

## 7. Access Control

Access follows the **Principle of Least Privilege**.

### Authentication
- Multi-factor authentication (MFA) required for all accounts
- Hardware security key support (WebAuthn/FIDO2)
- Biometric authentication supported on mobile devices
- Session timeout after 15 minutes of inactivity

### Authorization
- Role-based access control (RBAC) for team accounts
- Granular permission sets:
  - **Viewer:** Read-only access to dashboards and reports
  - **Operator:** Can modify configurations, cannot withdraw/transfer
  - **Admin:** Full access, including user management
  - **Executor:** Can initiate trades within defined limits
- Approval workflows for high-risk actions

### Audit Logging
- All administrative actions logged with timestamp, user, IP, and action
- Logs are immutable (write-once, append-only storage)
- Retention period: 2 years
- Regular audit log review by security team

### Administrative Separation
- No single administrator can access all systems
- Dual-control required for infrastructure changes
- Regular access reviews (quarterly)
- Immediate revocation on role change or termination

---

## 8. User Control

Users retain full control over their platform engagement.

### Exchange Connections
- Users may connect or disconnect exchanges at any time
- Granular API permission scopes (read-only vs. trading)
- Automatic API key health monitoring with expiration alerts

### Trading Automation
- Enable/disable autonomous execution with single toggle
- Emergency stop functionality (immediate halt)
- Gradual automation levels (advisory → semi-auto → fully autonomous)

### Data Sharing Preferences
- Granular consent controls for diagnostic data sharing
- Opt-out of anonymized analytics at any time
- Clear disclosure of what data is shared and why

### Account Deletion
- Self-service account deletion available
- Complete data purge within 30 days of request
- Legal retention exceptions documented and minimized
- Deletion confirmation with audit trail

### Permission Revocation
- Instant revocation of all API permissions
- Immediate session termination
- Automatic notification of all connected services

---

## 9. Transparency

The platform clearly discloses all data practices.

### What Information Is Collected
Complete inventory available at: privacy.yarnprotocol.com/data-inventory

### Why It Is Collected
Each data element includes a stated purpose aligned with:
- Contractual necessity (providing the service)
- Legal obligation (compliance with applicable law)
- Legitimate interest (platform security and improvement)
- User consent (optional features)

### How It Is Processed
- Processing activities documented in Register of Processing Activities
- Automated decision-making disclosed where applicable
- AI/ML model training uses only anonymized data

### How Long It Is Retained
| Data Category | Retention Period | Rationale |
|---|---|---|
| Account information | Until account deletion | Service provision |
| Trading history | 7 years | Legal/regulatory requirement |
| API credentials | Never stored centrally | Security |
| Audit logs | 2 years | Security monitoring |
| Anonymized analytics | 2 years rolling | Platform improvement |
| Session tokens | Until logout + 15 min | Authentication |
| Diagnostic data (opt-in) | 1 year | Product improvement |

### Who Has Access
- User: Full access to own data
- YARN Support: Access only with explicit user permission
- YARN Security Team: Anonymized security-relevant data only
- Third Parties: None (except essential service providers under contract)

---

## 10. Security Monitoring

Continuous security practices are implemented across the platform.

### Security Operations
- 24/7 security monitoring with automated alerting
- Security Information and Event Management (SIEM) system
- Real-time threat detection and response
- Weekly vulnerability scans
- Monthly penetration testing by third-party security firms

### Incident Response
- Documented incident response plan
- 15-minute response time for critical incidents
- User notification within 24 hours of confirmed breach
- Annual incident response drills
- Post-incident reviews with published findings

### Secure Development
- Secure Software Development Lifecycle (SSDLC)
- Mandatory code review by senior engineers
- Static and dynamic application security testing (SAST/DAST)
- Dependency vulnerability scanning in CI/CD pipeline
- Security training for all engineering staff (annual)

### Change Management
- All infrastructure changes require security review
- Staged deployment with rollback capability
- Change approval by security team for high-risk changes
- Automated testing of security controls after deployment

---

## 11. Third-Party Services

Only trusted providers meeting appropriate security and privacy standards are used.

### Current Service Providers
- Cloud Infrastructure: [Provider] (SOC 2 Type II certified)
- Database Services: [Provider] (ISO 27001 certified)
- CDN/DDoS Protection: [Provider]
- Email Services: [Provider]

### Access Limitations
- Third-party access limited to minimum necessary
- No access to user portfolio data or credentials
- Regular third-party security assessments
- Contractual data protection requirements

### External Dependencies
- Sensitive processing remains within the YARN ecosystem where possible
- Credentials are never shared with third parties
- External dependencies regularly reviewed for security posture
- Backup plans for critical third-party services

---

## 12. Regulatory Support

YARN Protocol is designed to support compliance with applicable privacy legislation.

### Supported Frameworks
- **EU GDPR** — Full data subject rights support
- **UK GDPR** — Post-Brexit UK compliance
- **California CCPA/CPRA** — Consumer privacy rights
- **Australia Privacy Act** — Australian privacy principles
- **Canada PIPEDA** — Canadian privacy framework
- **Singapore PDPA** — Singapore data protection
- **Other International Standards** — ISO 27001, SOC 2 Type II aligned

### Compliance Mechanisms
- Data Processing Agreements (DPAs) available
- Standard Contractual Clauses (SCCs) for international transfers
- Data Protection Officer (DPO) appointed
- Regular compliance audits
- Privacy Impact Assessments for major changes

### Important Disclaimer
Users remain responsible for complying with the financial, tax, and investment laws applicable to their jurisdiction. YARN Protocol accepts no liability for:
- Trading losses or market events
- Tax obligations or reporting requirements
- Regulatory compliance in user's jurisdiction
- Exchange failures or third-party service disruptions

---

## 13. Governance

Privacy and security are continuous processes.

### Policies Maintained
- Information Security Policy
- Data Protection Policy
- Incident Response Plan
- Business Continuity Plan
- Third-Party Risk Management Policy
- Acceptable Use Policy

### Review Schedule
- Annual policy review by security and legal teams
- Quarterly risk assessments
- Monthly security committee meetings
- Weekly security operations reviews

### Audit Procedures
- Annual external security audit
- Quarterly internal compliance audits
- Continuous automated compliance monitoring
- Penetration testing reports published annually

---

## 14. Legal Disclaimer

YARN Protocol is a portfolio intelligence, capital allocation, and trade execution software platform. It does not provide financial, investment, legal, or tax advice, nor does it recommend or guarantee any investment outcome. All investment decisions remain the sole responsibility of the user.

Users retain exclusive ownership and control of their assets, exchange accounts, and API credentials. YARN Protocol never takes custody of client funds and executes transactions only in accordance with user-defined rules and permissions.

Investing in financial markets involves substantial risk, including the possible loss of all invested capital. Past performance, historical simulations, backtests, probabilities, expected returns, and portfolio metrics are not guarantees of future performance.

By using YARN Protocol, users acknowledge and accept these risks and agree that all portfolio management and execution decisions are undertaken at their own discretion and risk.

---

## 15. Contact

### Data Protection Officer
- **Email:** privacy@yarnprotocol.com
- **Response Time:** Within 48 hours

### Security Team
- **Email:** security@yarnprotocol.com
- **Response Time:** Within 4 hours
- **PGP Key:** Available at security.yarnprotocol.com

### Legal
- **Email:** legal@yarnprotocol.com

### Bug Bounty Program
- **URL:** security.yarnprotocol.com/bounty
- **Scope:** All YARN Protocol services
- **Rewards:** Up to $50,000 for critical vulnerabilities

---

## 16. Changes to This Policy

This policy may be updated periodically. Users will be notified of material changes via:
- Email notification to registered addresses
- In-platform notification
- 30-day notice period before material changes take effect

Current version always available at: yarnprotocol.com/privacy

---

**Core Principle:**

> **Privacy by Design. Security by Default. User Sovereignty Always.**

Every architectural decision minimizes data collection, maximizes user control, protects sensitive information, and ensures that portfolio intelligence and autonomous execution operate within a secure, transparent, and privacy-first ecosystem.

---

*Document Version: 1.0*
*Effective Date: July 14, 2025*
*Next Review Date: January 14, 2026*
