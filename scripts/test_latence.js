const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://robot-sang-injaz-4d80e-default-rtdb.firebaseio.com'
});

const db = admin.database();
const NB_TESTS = 10;
const resultats = [];

async function testerLatence() {
  console.log('Test de latence — ' + NB_TESTS + ' envois...');
  for (let i = 0; i < NB_TESTS; i++) {
    const debut = Date.now();
    await db.ref('ambulances/AMB-03/derniere_detection').update({
      groupe_sanguin: 'B-',
      confiance: 97.5,
      timestamp: new Date().toISOString(),
      patient_id: 'PAT-TEST-' + i,
      ambulance_id: 'AMB-03',
      hopital: 'CHU Casablanca',
      statut: 'transmis'
    });
    const latence = Date.now() - debut;
    resultats.push(latence);
    console.log('Test ' + (i+1) + ' : ' + latence + ' ms');
    await new Promise(r => setTimeout(r, 2000));
  }
  const moy = Math.round(resultats.reduce((a,b)=>a+b,0) / NB_TESTS);
  const min = Math.min(...resultats);
  const max = Math.max(...resultats);
  const ok = resultats.filter(l => l < 5000).length;
  console.log('');
  console.log('=== RESULTATS ===');
  console.log('Latence moyenne : ' + moy + ' ms');
  console.log('Latence minimum : ' + min + ' ms');
  console.log('Latence maximum : ' + max + ' ms');
  console.log('Tests < 5 sec : ' + ok + '/' + NB_TESTS);
  console.log(ok === NB_TESTS ? 'OBJECTIF ATTEINT !' : 'ATTENTION : objectif non atteint');
  process.exit(0);
}

testerLatence();