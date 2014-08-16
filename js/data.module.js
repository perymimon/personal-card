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
        iconLiving:'img/lives.icon.png'
    });
