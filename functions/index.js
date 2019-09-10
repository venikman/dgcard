const sgMail = require('@sendgrid/mail')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const stas = functions.config()

sgMail.setApiKey(stas.sendgrid.apikey)
admin.initializeApp(stas.firebase)

const db = admin.firestore()

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const queryParams = req.query
  let docRef
  try {
    docRef = await db.collection('pending')
    const doc = await docRef.add(queryParams)
    const linkToConfirm = new URLSearchParams([
      ['id', doc.id],
      ['email', queryParams.email]
    ])
    const { hostname, protocol } = req
    const confirmUrl = `${protocol}://${hostname}/confirmSave?${linkToConfirm}`
    const msg = {
      to: queryParams.email,
      from: 'no-reply@dgcard.com',
      subject: 'Confirmation',
      text: `Visit ${confirmUrl} to confirm your dgcard`,
      html: `<a href="${confirmUrl}">Confirm your email</a> to save dgcard under your email or ignore this email if you didn't use dgcard tool.`
    }
    sgMail.send(msg)
    res.send(200)
  } catch (error) {
    console.log('oops', error)
    res.send(500)
  }
})

exports.confirmSave = functions.https.onRequest(async (req, res) => {
  const { id, email } = req.query
  const validateUserRef = db.collection('pending').doc(id)
  const validateUser = (await validateUserRef.get()).data()
  if (validateUser && validateUser.email === email) {
    const docRef = await db.collection('users').doc(email)
    await docRef.set(validateUser)
    await validateUserRef.delete()
    return res.send(`Confirmed ${JSON.stringify(validateUser, null, 2)}`)
  }
  res.send('Failed to Confirm')
})
