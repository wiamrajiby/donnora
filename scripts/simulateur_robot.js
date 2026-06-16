const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://robot-sang-injaz-4d80e-default-rtdb.firebaseio.com'
});

const db = admin.database();

const groupes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const ambulances = ['AMB-03', 'AMB-07', 'AMB-12'];
const hopitaux = ['CHU Casablanca', 'CHU Rabat', 'CHU Tanger'];

function genererDetection(ambulanceId) {
  const groupe = groupes[Math.floor(Math.random() * groupes.length)];
  const confiance = parseFloat((Math.random() * 14 + 85).toFixed(1));
  const patientNum = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
  const hopitalIdx = ambulances.indexOf(ambulanceId);
  return {
    groupe_sanguin: groupe,
    confiance: confiance,
    timestamp: new Date().toISOString(),
    patient_id: 'PAT-' + patientNum,
    ambulance_id: ambulanceId,
    hopital: hopitaux[hopitalIdx] || 'CHU Casablanca',
    statut: confiance >= 90 ? 'transmis' : 'faible_confiance',
    eta: Math.floor(Math.random() * 15 + 3) + ' min'
  };
}

async function envoyerDetection(ambulanceId) {
  const detection = genererDetection(ambulanceId);
  const ref = db.ref('ambulances/' + ambulanceId);
  await ref.update({
    status: 'en_route',
    derniere_detection: detection
  });
  console.log('Detection envoyee : ' + ambulanceId + ' -> ' + detection.groupe_sanguin + ' (' + detection.confiance + '%) — ' + detection.timestamp);
  return detection;
}

async function modeManuel() {
  console.log('Mode manuel — AMB-03');
  await envoyerDetection('AMB-03');
  process.exit(0);
}

function modeAuto() {
  console.log('Mode auto — detection toutes les 10 secondes...');
  let i = 0;
  setInterval(async () => {
    const amb = ambulances[i % ambulances.length];
    await envoyerDetection(amb);
    i++;
  }, 10000);
}

const mode = process.argv[2];
if (mode === 'auto') {
  modeAuto();
} else {
  modeManuel();
}