# 🚀 S-Kite Deployment Checklist

Quick checklist for deploying S-Kite to production.

## ✅ Pre-Deployment Checklist

### Environment Setup

- [ ] Switch to live environment: `./switch-env.sh live`
- [ ] Verify environment: `./switch-env.sh validate`
- [ ] Confirm live Stripe keys configured
- [ ] Check Firebase project: `firebase projects:list`
- [ ] Verify authentication: `firebase login:list`

### Code Quality

- [ ] All features tested locally
- [ ] TypeScript compilation clean: `yarn type-check`
- [ ] No linting errors (optional): `yarn lint`
- [ ] All dependencies up to date
- [ ] Clean git status (optional)

### Security

- [ ] No hardcoded secrets in code
- [ ] Environment variables properly configured
- [ ] Stripe keys match intended environment (live)
- [ ] Firebase security rules reviewed

## 🔨 Deployment Steps

### 1. Build Process

```bash
# Clean and build
yarn clean:build
```

- [ ] Build completed successfully
- [ ] No TypeScript errors
- [ ] Bundle size acceptable (< 1MB)
- [ ] All assets generated in dist/

### 2. Firebase Deployment

```bash
# Deploy to Firebase
firebase deploy --only hosting
```

- [ ] Deployment completed successfully
- [ ] No errors in deployment log
- [ ] All files uploaded (8 files expected)
- [ ] Version finalized and released

### 3. Verification

```bash
# Test deployment
curl -s -o /dev/null -w "%{http_code}" https://skite-app.web.app
```

- [ ] Site returns 200 status code
- [ ] Home page loads correctly
- [ ] All assets loading (images, CSS, JS)
- [ ] No console errors in browser

## 🌐 Custom Domain Setup (skite.info)

### Firebase Console

- [ ] Navigate to Firebase Console → Hosting → Custom domains
- [ ] Add custom domain: `skite.info`
- [ ] Complete domain verification process
- [ ] Note DNS record requirements

### DNS Configuration

- [ ] Add A records for root domain
- [ ] Add CNAME for www subdomain
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify DNS records: `nslookup skite.info`

### SSL Certificate

- [ ] Firebase SSL certificate provisioned
- [ ] HTTPS enforced for custom domain
- [ ] Certificate valid and trusted
- [ ] Redirects working correctly

## 🧪 Post-Deployment Testing

### Functional Testing

- [ ] **Home page**: Loads and displays correctly
- [ ] **Navigation**: All menu items work
- [ ] **Responsive**: Mobile and desktop layouts
- [ ] **Authentication**: Login/signup flows
- [ ] **Payment**: Stripe checkout process (test carefully!)
- [ ] **Theme**: Dark/light mode toggle
- [ ] **Performance**: Page load times acceptable

### Technical Testing

- [ ] **HTTPS**: SSL certificate valid
- [ ] **SEO**: Meta tags and titles present
- [ ] **Analytics**: Firebase Analytics tracking (if enabled)
- [ ] **Console**: No JavaScript errors
- [ ] **Network**: All resources loading correctly

### Payment Testing (CRITICAL)

- [ ] **Stripe Mode**: Confirmed live mode
- [ ] **Price IDs**: Correct product pricing
- [ ] **Webhooks**: Payment confirmation working
- [ ] **Test Transaction**: Small test purchase (if safe)

## 📊 Monitoring Setup

### Firebase Console

- [ ] Hosting dashboard configured
- [ ] Performance monitoring enabled
- [ ] Error reporting set up
- [ ] Analytics configured (optional)

### External Monitoring

- [ ] Domain monitoring for skite.info
- [ ] SSL certificate expiry monitoring
- [ ] Performance monitoring (Core Web Vitals)
- [ ] Uptime monitoring

## 🚨 Rollback Plan

### If Issues Occur

```bash
# Rollback to previous version (if needed)
firebase hosting:releases:list
firebase hosting:releases:rollback
```

### Emergency Contacts

- [ ] Firebase project admin access confirmed
- [ ] Stripe dashboard access available
- [ ] Domain registrar login details accessible
- [ ] Development team contact information

## 📝 Documentation Updates

### Update Documentation

- [ ] Deployment guide updated with any changes
- [ ] Environment variables documented
- [ ] Custom domain setup instructions current
- [ ] Team notified of deployment

### Version Control

- [ ] Deployment commit tagged (optional)
- [ ] Production branch updated (if using)
- [ ] Release notes created (if applicable)

## ✅ Final Verification

### Live Site Check

- [ ] **URL**: https://skite-app.web.app is live
- [ ] **Custom Domain**: https://skite.info working (after DNS)
- [ ] **All Features**: Working as expected
- [ ] **Performance**: Acceptable load times
- [ ] **No Errors**: Console and network clean

### Business Requirements

- [ ] **Payments**: Live Stripe processing working
- [ ] **User Authentication**: Firebase Auth functional
- [ ] **Data Storage**: Firestore operations working
- [ ] **User Experience**: All flows complete successfully

## 🎉 Deployment Complete

### Success Criteria Met

- [ ] Site deployed to https://skite-app.web.app
- [ ] Custom domain skite.info configured (DNS pending)
- [ ] Live Stripe payments functional
- [ ] All user flows working
- [ ] Performance acceptable
- [ ] Security measures in place

### Next Steps

- [ ] Monitor deployment for issues
- [ ] Complete custom domain DNS setup
- [ ] Notify stakeholders of go-live
- [ ] Schedule post-deployment review

---

## 🆘 Emergency Procedures

### Critical Issues

1. **Site Down**: Check Firebase Status page
2. **Payment Issues**: Verify Stripe dashboard
3. **DNS Problems**: Contact domain registrar
4. **SSL Issues**: Check Firebase Console

### Contacts

- **Firebase Support**: Firebase Console → Support
- **Stripe Support**: Stripe Dashboard → Help
- **Domain Support**: Your domain registrar support

---

**Deployment Date**: ****\_\_\_****  
**Deployed By**: ****\_\_\_****  
**Verified By**: ****\_\_\_****  
**Custom Domain Status**: ****\_\_\_****
