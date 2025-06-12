# AIUB CGPA Calculator

A modular, responsive CGPA calculator for the American International University-Bangladesh (AIUB) built with vanilla HTML, CSS, and JavaScript. It allows users to dynamically add subjects, input midterm and final scores, choose weight distributions, calculate letter grades and overall CGPA, and export the results as a PDF.

## Features

* **Dynamic Subject Management**: Add or remove subject rows on the fly, ensuring at least one subject remains.
* **Real-time Validation**: Instant feedback for midterm and final score inputs (0-100) with error messages.
* **Customizable Weight Distribution**: Choose between 40% midterm / 60% final or 50% midterm / 50% final for each subject.
* **Automated Grade Calculation**:

  * Calculates weighted score for each subject.
  * Maps scores to letter grades (A+, A, B+, etc.) and corresponding grade points.
  * Computes overall CGPA across all subjects.
* **Responsive Design**: Optimized layout for mobile, tablet, and desktop viewports.
* **PDF Export**: Generate and download a well-formatted PDF of the results using html2pdf.js.
* **Accessible & Semantic**: ARIA labels, keyboard-friendly controls, and semantic HTML5 elements.

## interface

<img width="948" alt="Screenshot 2025-05-01 at 10 47 23 PM" src="https://github.com/user-attachments/assets/38fd26e6-6e41-4030-b7b1-b2db210bef66" />  

## File Structure

```
├── index.html   # Main markup linking CSS & JS
├── styles.css   # Styling with CSS variables and responsive rules
├── script.js    # Logic for dynamic rows, validation, calculation, and PDF export
└── README.md    # Project overview and usage instructions
```

## Installation & Usage

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/aiub-cgpa-calculator.git
   cd aiub-cgpa-calculator
   ```
2. **Open** `index.html` in your preferred browser.
3. **Add subjects**, input scores, select weight distributions, and click **Calculate CGPA**.
4. Click **Download PDF** to export your results.

## Dependencies

* [html2pdf.js](https://github.com/eKoopmans/html2pdf.js/) for client-side PDF generation.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the project and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

