#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
    ll t;
    cin>>t;
    while(t--){
        string s;
        cin>>s;
        ll a[4];
        ll c[4];
        ll r;
        
        for(ll i=0;i<4;i++){
            cin>>a[i];
        }
        for(ll i=0;i<4;i++){
            cin>>c[i];
        }
        
        cin>>r;
        cout<<"hello";
        ll left[4];
        
        ll trk[26] = {0};
        ll n = s.length();
        for(ll i=0;i<n;i++){
            trk[s[i]-'A']++;
        }
        
        left[0] = trk[5] - a[0];
        left[1] = trk[4] - a[1];
        left[2] = trk[18] - a[2];
        left[3] = trk[1] - a[3];
        ll sum = 0;
        for(ll i=0;i<4;i++){
            sum = sum + left[i]*c[i];
        }
        cout<<r;
        cout<<sum;
        cout<<r/sum<<endl;
    }
}