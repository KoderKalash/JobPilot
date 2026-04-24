import fs from "fs";
import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async(filePath: string): Promise<string> => {
    let parser: PDFParse | null = null;

    try {
        const dataBuffer = fs.readFileSync(filePath);
        parser = new PDFParse({ data: dataBuffer });
        const data = await parser.getText();

        return data.text;
    } catch (error) {
        console.error("PDF parsing failed:", error);
        throw new Error("Failed to extract text from PDF");
    } finally {
        if (parser) {
            await parser.destroy();
        }
    }
}
