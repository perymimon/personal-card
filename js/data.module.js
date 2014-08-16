/**
 * Created by pery on 16/08/14.
 */
angular.module('dataModule', [])
    .value('person', {
        name:'pery mimon',
        profession:'Web client developer',
        workingCompany:'a.mo.bee',
        pastCompany:'proGame',
        birthday:'21 September',
        city:'netanya',
        country:'israel',
        studied:'Bar-Ilan University',
        pastStudied:'Bar-Ilan Netanya',
        degree:'B.A.',
        fieldTitle:'Applied Mathematics',
        phone: '( +972 ) 054-3043-757',
        email: 'pery.mimon@gmail.com',
        accounts: 'fb.com/pery.mimon'


    })
    .value('images',{
        me:'img/me.png',
        iconLiving:'img/lives.icon.png',
        iconWork:'img/work.icon.png',
        iconStudy:'img/study.icon.png',
        iconBirthday:'img/birethday_icon.png',
        iconDegree:'img/dgree-logo.png',
        iconEmail:'img/gmail_logo.png',
        iconFB:'img/fb-logo.jpg',
        iconInstagram:'img/Instagram_logo.png',
        iconLinkdin:'img/LinkedIn_logo.png',
        iconTwitter:'img/twitter-logo-1.jpg',
        iconGitHub:'img/github_logo.png',
        iconPlus:'img/plus-badge.png',
        cover:'img/971792_10151600465809591_1233828151_n.jpg',
        qrCode:'img/qcode.png',
        moreImage0:'img/eddie.jpg',
        moreImage1:'img/shelly.jpg',
        moreImage2:'',
        moreImage3:'',
        moreImage4:''

    });
