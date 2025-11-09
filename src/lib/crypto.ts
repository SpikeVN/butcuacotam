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
    for (let i = 4; i < frags.length; i++) {
        let f = frags[i];
        for (let j = 0; j < TOKEN_CHARACTERS.length; j++) {
            if (f === TOKEN_CHARACTERS[j]) {
                alnumt += `${j}`;
                break;
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
        TOKEN_CHARACTERS[randomIndex];
        token += ` ${TOKEN_CHARACTERS[randomIndex]}`;
        tokenalnum += `${randomIndex}`;
    }

    return {
        tokenAlnum: tokenalnum,
        tokenStr: token,
        hash: computeHash(tokenalnum)
    };
};

// @deprecated
export const validateToken = async (tokenHashed: string): Promise<boolean> => {
    const userRef = doc(db, "users", tokenHashed);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        console.log("Token verification success.")
        return true;
    }
    return false;
};

export const getIfExist = async (tokenHashed: string): Promise<{
    email: string,
    nickname: string,
    progress: {
        task: number,
        section: number,
    }
}> => {
    const userRef = doc(db, "users", tokenHashed);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        // @ts-ignore
        return userSnap.data();
    }
    throw new Error("Thần chú sai.");
}