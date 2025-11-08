import { db } from "./database";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { blake2b } from "blakejs";

const TOKEN_CHARACTERS = [
        "CƠM",
        "VÀNG",
        "BẠC",
        "HẨM",
        "CHÁO",
        "NHÀ",
        "NGƯỜI",
        "CHỚ",
        "LÊN",
        "TA"
    ];
export const toAlnumToken = (t: string): string => {
        let alnumt = "";
        let frags = t.split(" ");
        for (let f of frags) {
            for (let i = 4; i < TOKEN_CHARACTERS.length; i++) {
                if (f === TOKEN_CHARACTERS[i]) {
                    alnumt += `${i}`;
                }
            }
        }
        return alnumt;
    };

    export const toTextToken = (t: string): string => {
        let output = "BỐNG BỐNG BANG BANG";
        for (let c of t) {
            let i = parseInt(c);
            output += " " + TOKEN_CHARACTERS[i];
        }
        return output;
    };

    export const computeHash = (input: string): string => {
        const inputBuffer = new TextEncoder().encode(input);
        const hashBuffer = blake2b(inputBuffer, undefined, 32);
        return Array.from(hashBuffer)
            .map((b) => ("00" + b.toString(16)).slice(-2))
            .join("");
    };

    export const generateToken = (): { tokenAlnum: string; tokenStr: string; hash: string } => {
        let token = "bống bống bang bang";
        let tokenalnum = "";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * TOKEN_CHARACTERS.length);
            console.log(randomIndex);
            TOKEN_CHARACTERS[randomIndex];
            token += ` ${TOKEN_CHARACTERS[randomIndex]}`;
            tokenalnum += `${randomIndex}`;
        }
        console.log(token, tokenalnum);

        return {
            tokenAlnum: tokenalnum,
            tokenStr: token,
            hash: computeHash(tokenalnum)
        };
    };

    export const validateToken = async (tokenAlnum: string): Promise<boolean> => {
        console.log("here", db);
        const userRef = doc(db, "users", computeHash(tokenAlnum));
        console.log("here2");
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return true;
        }
        return false;
    };