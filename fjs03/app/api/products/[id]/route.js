import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../serviceAccountKey.json'; 

if (!admin.apps.length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}
const db = getFirestore();

export async function GET(request) {
    try {
        const categoriesRef = db.collection('categories'); 
        const snapshot = await categoriesRef.get();

        const categories = [];
        snapshot.forEach(doc => {
            categories.push({ id: doc.id, ...doc.data() });
        });

        return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error("Error getting categories: ", error);
        return new Response("Error fetching categories", { status: 500 });
    }
}
