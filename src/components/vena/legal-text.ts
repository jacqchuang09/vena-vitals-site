/**
 * Policy text for the legal pages, transcribed from the pages Vena Vitals
 * already publishes at venavitals.com/privacy-policy and
 * venavitals.com/terms-and-conditions on 29 Sep 2026.
 *
 * Transcribed, not rewritten: the text was taken from the rendered pages
 * character for character, including its own typos ("DEFINITONS", the spacing
 * in "April 18 , 2022", and the malformed self-reference URL at the end of the
 * privacy policy). Nothing here is drafted, summarised or corrected, because
 * this is legal and regulatory copy and neither is ours to change. Any edit
 * should come from the Vena Vitals team.
 */

export type LegalNode =
  | { kind: "heading"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

export type LegalDoc = {
  title: string;
  /** The document's own date line, shown under the title. */
  date: string;
  body: LegalNode[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  date: "Last updated: June 6, 2025",
  body: [
    {
      kind: "p",
      text: "This privacy policy describes our policies and procedures on the collection, use and disclosure of your information when you use Vena Vitals VeriTrack and tells you about your privacy rights.",
    },
    {
      kind: "heading",
      text: "VENA VITALS VERITRACK DOES NOT COLLECT INFORMATION",
    },
    {
      kind: "p",
      text: "Vena Vitals VeriTrack does not collect, retain, or share any personal information from users. We do not track your activity, location, or device usage, and we do not use any third-party analytics, advertising, or data storage services within the app.",
    },
    {
      kind: "heading",
      text: "DO NOT TRACK SIGNALS",
    },
    {
      kind: "p",
      text: "Vena Vitals VeriTrack does not track users over time or across third-party websites, and therefore we do not respond to Do Not Track (DNT) signals. Since we do not collect personal data, data that relates to an identified or identifiable individual, DNT signals have no effect on how the Vena Vitals VeriTrack application operates.",
    },
    {
      kind: "heading",
      text: "CALIFORNIA CONSUMER PRIVACY ACT (CCPA / CPRA) COMPLIANCE",
    },
    {
      kind: "p",
      text: "We are committed to complying with applicable U.S. state privacy laws, including those in California, Virginia, Colorado, Connecticut, Utah, and others. Since Vena Vitals VeriTrack does not collect any personal information, these laws currently do not apply. However, users may contact us with any questions about their privacy rights.",
    },
    {
      kind: "heading",
      text: "YOUR RIGHTS UNDER CCPA/CPRA AND U.S. STATE PRIVACY LAWS (IF APPLICABLE)",
    },
    {
      kind: "list",
      items: [
        "Right to Know – you may request details about the personal information we collect, use, disclose, and sell.",
        "Right to Delete – you may request deletion of your personal information, subject to certain exceptions.",
        "Right to Correct – you may request correction of inaccurate personal information.",
        "Right to Opt-Out of Sale/Sharing – we do not sell or share your personal information.",
        "Right to Non-Discrimination – we will not discriminate against you for exercising your privacy rights.",
      ],
    },
    {
      kind: "p",
      text: "Since we do not collect personal data, these rights currently do not apply. However, you may contact us at info@venavitals.com with any questions or concerns.",
    },
    {
      kind: "heading",
      text: "CHILDREN'S PRIVACY",
    },
    {
      kind: "p",
      text: "We do not knowingly collect personally identifiable information from anyone, including those under the age of 13. If we become aware that we have collected personal data from anyone under the age of 13 without verification of parental consent, we take steps to remove that information from our servers.",
    },
    {
      kind: "heading",
      text: "CHANGES TO THIS PRIVACY POLICY",
    },
    {
      kind: "p",
      text: "We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last updated' date at the top. If changes are material, we will provide a prominent notice within the application or by other appropriate means prior to the change becoming effective.",
    },
    {
      kind: "heading",
      text: "CONTACT US",
    },
    {
      kind: "p",
      text: "If you have any questions about this privacy policy, you can contact us:",
    },
    {
      kind: "p",
      text: "By email: info@venavitals.com",
    },
    {
      kind: "p",
      text: "By visiting this page on our website: https://www.venavitals/privacypolicy.com",
    },
  ],
};

export const fcoiPolicy: LegalDoc = {
  title: "Financial Conflict of Interest Policy",
  date: "April 18 , 2022",
  body: [
    {
      kind: "heading",
      text: "SCOPE",
    },
    {
      kind: "p",
      text: "This financial conflict of interest policy (“FCOI Policy”) establishes guidelines for implementation of federal Public Health Service (PHS) agency requirements related to financial disclosures by a Principal Investigator (PI) or any employee participating in National Institutes of Health (NIH) grant-funded research. The FCOI policy is intended to promote objectivity in research by establishing standards that provide a reasonable expectation that the design, conduct, and reporting of research funded under PHS grants or cooperative agreements will be free from bias resulting from investigator financial conflicts of interest.",
    },
    {
      kind: "heading",
      text: "DEFINITONS",
    },
    {
      kind: "p",
      text: "“Investigator” means the project director or principal Investigator and any other person, regardless of title or position, who is responsible for the design, conduct, or reporting of research funded by the NIH, or proposed for such funding, which may include, for example, collaborators or consultants.",
    },
    {
      kind: "p",
      text: "“Institution” means any domestic or foreign, public or private, entity or organization (excluding a Federal agency) that is applying for, or that receives, PHS research funding",
    },
    {
      kind: "p",
      text: "“Financial conflict of interest” (FCOI) means an SFI  that could directly and significantly affect the design, conduct, or reporting of research as determined by Vena Vitals through the Designated Official.",
    },
    {
      kind: "p",
      text: "“Significant financial interest” (SFI)",
    },
    {
      kind: "list",
      items: [
        "SFI means a financial interest consisting of one or more of the following interests of the investigator (and those of the investigator’s spouse/domestic partner or dependent children) that will reasonably appear to be related to the investigator’s research responsibilities:",
      ],
    },
    {
      kind: "p",
      text: "With regard to any publicly traded entity, a SFI exists if the value of any remuneration received from the entity in the twelve months preceding the disclosure and the value of any equity interest in the entity as of the date of disclosure, when aggregated, exceeds $5,000.  For purposes of this definition, remuneration includes salary and any payment for services not otherwise identified as salary (e.g., consulting fees, honoraria, paid authorship); equity interest includes any stock, stock option, or other ownership interest, as determined through reference to public prices or other reasonable measures of fair market value;",
    },
    {
      kind: "p",
      text: "With regard to any non-publicly traded entity, a SFI exists if the value of any remuneration received from the entity in the twelve months preceding the disclosure, when aggregated, exceeds $5,000, or when the Investigator (or the Investigator’s spouse or dependent children) holds any equity interest (e.g., stock, stock option, or other ownership interest); or",
    },
    {
      kind: "p",
      text: "Intellectual property rights and interests (e.g., patents, copyrights), upon receipt of income related to such rights and interests.",
    },
    {
      kind: "list",
      items: [
        "Investigators also must disclose the occurrence of any reimbursed or sponsored travel (i.e., that which is paid on behalf of the Investigator and not reimbursed to the Investigator so that the exact monetary value may not be readily available), related to their institutional responsibilities in the twelve months preceding the disclosure if the value of such travel, when aggregated from all sources, exceeds $5,000; provided, however, that this disclosure requirement does not apply to travel that is reimbursed or sponsored by a federal, state, or local government agency, an Institution of higher education as defined at 20 U.S.C. 1001(a), an academic teaching hospital, a medical center, or a research institute that is affiliated with an Institution of higher education.  The disclosure, which will include, at a minimum, the purpose of the trip, the identity of the sponsor/organizer, the destination, and the duration. In accordance with the Institution’s FCOI policy, the institutional official(s) will determine if further information is needed, including a determination or disclosure of monetary value, in order to determine whether the travel constitutes an FCOI with the PHS-funded research.",
        "SFI does not include the following types of financial interests:",
      ],
    },
    {
      kind: "p",
      text: "Salary, royalties, or other remuneration paid by the Institution to the Investigator if the Investigator is currently employed or otherwise appointed by the Institution;",
    },
    {
      kind: "p",
      text: "Intellectual Property Rights assigned to the Institution and agreements to share in royalties related to such rights;",
    },
    {
      kind: "p",
      text: "Any ownership interest in the Institution held by the Investigator, if the Institution is a commercial or for-profit organization;",
    },
    {
      kind: "p",
      text: "“Designated Official” means the individual designated by Vena Vitals to oversee the financial conflicts of interest process, including solicitation and review of disclosures of significant financial interests.",
    },
    {
      kind: "p",
      text: "“Research” means any research funded by a PHS / NIH grant, cooperative agreements, or contracts.",
    },
    {
      kind: "heading",
      text: "TRAINING REQUIREMENTS",
    },
    {
      kind: "p",
      text: "The Designated Official or his/her designee is responsible for informing Vena Vitals’ investigators, employees, and subrecipients involved in PHS/NIH-supported research about the following:",
    },
    {
      kind: "list",
      items: [
        "The FCOI policy and any related regulations;",
        "Their obligations to disclose any FCOI prior to engaging in PHS/NIH-supported research;",
        "Federal regulation (https://grants.nih.gov/grants/policy/coi/tutorial2018/story_html5.html)",
      ],
    },
    {
      kind: "p",
      text: "The Designated Official or his/her designee is responsible for ensuring Vena Vitals’ investigators, employees, and subrecipients involved in PHS/NIH-supported research complete training related to the FCOI policy prior to engaging in PHS/NIH-supported research, which will occur no less than every four years, and immediate under the following circumstances:",
    },
    {
      kind: "list",
      items: [
        "The FCOI policy is revised;",
        "A new investigator, employee, and subrecipient becomes involved in the PHS/NIH-supported research;",
        "The investigator, employee, and subrecipient is non-compliant with the FCOI policy or any related regulation",
      ],
    },
    {
      kind: "heading",
      text: "DISCLOSURE, REVIEW AND MONITORING REQUIREMENTS",
    },
    {
      kind: "p",
      text: "Each Investigator must disclose to the Designated Official or his/her designee his/her SFI related to the Investigator’s institutional responsibilities (and those of the Investigator’s spouse and dependent children) as follows:",
    },
    {
      kind: "list",
      items: [
        "An updated general SFI disclosure annually during the period of the award;",
        "Within 30 days of discovering or acquiring a new SFI;",
        "And no later than the time of application for PHS/NIH-supported research",
      ],
    },
    {
      kind: "p",
      text: "The Designated Official and his/her designee shall ensure Investigators, employees, and subrecipients are in compliance with the FCOI policy. Prior to expenditure of funds, or with respect to an ongoing PHS/NIH-supported research, within 60 days of disclosure or discovery of SFI, the Designated Official shall be responsible for:",
    },
    {
      kind: "list",
      items: [
        "Reviewing all forms disclosing SFI;",
        "Making determinations whether an Investigator’s SFI is related to funded research, and if so related;",
        "Whether the SFI is an FCOI, and if so;",
        "Developing and implementing a management plan to manage the FCOI",
      ],
    },
    {
      kind: "p",
      text: "An SFI is related to the PHS/NIH-supported research when the Designated Official reasonably determines that the SFI could be affected by the research or is an entity whose financial interest could be affected by the research.",
    },
    {
      kind: "p",
      text: "If an SFI is determined to be an FCOI, Vena Vitals shall take appropriate steps to address and manage the FCOI, which might include, but are not limited to, the following actions:",
    },
    {
      kind: "list",
      items: [
        "Public disclosure of financial conflicts of interest directly to human research participants;",
        "Appointment of an independent monitor;",
        "Modification of the research plan;",
        "Change of personnel or personnel responsibilities, or disqualification of personnel from participation in all or a portion of the research;",
        "Reduction or elimination of financial interest; and/or",
        "Severance of relationships that create financial conflicts.",
      ],
    },
    {
      kind: "p",
      text: "For all management plans, the Designated Official shall:",
    },
    {
      kind: "list",
      items: [
        "Monitor Investigator compliance with the management plan; and",
        "Submit annual updates to the PHS Awarding Component at the time and in the manner specified by the PHS Awarding Component, both until the completion of the PHS/NIH-supported research to which the FCOI related.",
      ],
    },
    {
      kind: "p",
      text: "If no FCOI is found, the SFI will be filed with the Designated Official’s SFI disclosure records.",
    },
    {
      kind: "heading",
      text: "PUBLIC ACCESSIBILITY REQUIREMENTS",
    },
    {
      kind: "p",
      text: "The FCOI policy will be available within 5 business days of a request and will be posted on a publicly available website.",
    },
    {
      kind: "p",
      text: "Prior to expending any funds under a PHS/NIH-supported grant or cooperative agreement, Vena Vitals shall ensure public accessibility to information concerning an FCOI held by a senior/key personnel member by providing a written response to any written request, such response to be postmarked or dated (if replying by electronic means) within 5 business days of the receipt of the written request. Such information shall consist of that required to be provided under the FCOI Regulations [§50.605(a)(5)(ii), (iii)], shall be updated at least annually and within 60 days of the receipt or identification of information concerning an additional significant financial interest, and shall remain available for 3 years from the date the information was most recently updated.",
    },
    {
      kind: "heading",
      text: "REPORTING REQUIREMENTS TO NIH",
    },
    {
      kind: "p",
      text: "Identified FCOIs will be reported through the eRA Commons FCOI module and its subrecipients, if applicable, and to the PHS Awarding Component within 60 days of identification of a new FCOI, prior to expenditure of funds. FCOI reports will be updated at least annually.",
    },
    {
      kind: "heading",
      text: "MAINTENANCE OF RECORDS",
    },
    {
      kind: "p",
      text: "Vena Vitals will maintain all FCOI-related records to all Investigator disclosures of financial interests and the Institution’s review of, and response, to such disclosures and all actions under the FCOI policy or retrospective review for at least 3 years from the date of the final expenditures report is submitted or, where applicable from other dates specified.",
    },
    {
      kind: "heading",
      text: "ENFORCEMENT MECHANISMS AND REMEDIES AND NONCOMPLIANCE",
    },
    {
      kind: "p",
      text: "If the Investigator has failed to comply with the Vena Vitals FCOI policy or, if an FCOI is one that was not identified, reviewed, or managed in a timely manner, the Designated Official will initiate and complete a retrospective review of the Investigator’s activities to determine bias with the design, conduct, or reporting of PHS/NIH-supported research within 120 days of determination of noncompliance. If a bias is found, the Designated Official shall submit a mitigation report to the applicable Funding agency in accordance with 42 CFR 50.605(b)(3), that shall address the impact of the bias on the research project and the actions it has taken to mitigate the bias.",
    },
    {
      kind: "p",
      text: "Any FCOI report will require sufficient information to enable the PHS Awarding Component to understand the nature and extent of the financial conflict. Elements of the FCOI report shall include, but are not necessarily limited to the following:",
    },
    {
      kind: "list",
      items: [
        "Project Number;",
        "Project Title;",
        "PD/PI or contact PI/PI if multiple PI/PI model is used;",
        "Name of Investigator with the FCOI;",
        "Name of entity with which the Investigator has an FCOI;",
        "Reasons for the retrospective review;",
        "Detailed methodology used for the retrospective review;",
        "Findings of the review; and",
        "Conclusions of the review",
      ],
    },
    {
      kind: "p",
      text: "For clinical research projects supported by the PHS, if the Department of Health and Human Services determines that a PHS/NIH-supported project of clinical research whose purpose is to evaluate the safety or effectiveness of a drug, medical device or treatment was designed, conducted, or reported by an investigator with an FCOI that was not properly disclosed or managed as required under the FCOI Regulations, the Investigator shall disclose the FCOI in each public presentation of the results of the research (such as articles, manuscripts and oral presentations) and Vena Vitals shall request an addendum to previously published presentations.",
    },
    {
      kind: "heading",
      text: "SUBRECIPIENT REQUIREMENTS",
    },
    {
      kind: "p",
      text: "The Designated Official or his/her designee shall establish, via written agreement, whether subrecipient investigators will comply with the FCOI Policy of Vena Vitals or that their institution(s). If applicable, Vena Vitals shall obtain a certification from the subrecipient that its FCOI policy complies with the regulation. If applicable, Vena Vitals shall include in the written subrecipient agreement a requirement for the subrecipient to report identified FCOIs for its Investigators in a time frame that allows Vena Vitals to report identified FCOIs to the applicable Funding Agencies as required by the regulation. Alternatively, if applicable, Vena Vitals shall include in the written agreement a requirement to solicit and review subrecipient Investigator disclosures that enable Vena Vitals to identify, manage and report identified FCOIs to the Funding Agency.",
    },
  ],
};
