# install oracle instant client on Ubuntu

## Reference site
- https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html  
- https://www.oracle.com/jp/database/technologies/instant-client/linux-x86-64-downloads.html
- https://stackoverflow.com/questions/27717312/sqlplus-error-while-loading-shared-libraries-libsqlplus-so-cannot-open-shared

## step guide

*1. download and unzip oracle instant client*
```
sudo apt-get install zip

cd ~/oracleclient
wget https://download.oracle.com/otn_software/linux/instantclient/219000/instantclient-basic-linux.x64-21.9.0.0.0dbru.zip
wget https://download.oracle.com/otn_software/linux/instantclient/219000/instantclient-sqlplus-linux.x64-21.9.0.0.0dbru.zip
sudo mkdir -p /opt/oracle
cd /opt/oracle/
sudo unzip ~/oracleclient/instantclient-basic-linux.x64-21.9.0.0.0dbru.zip
sudo unzip ~/oracleclient/instantclient-sqlplus-linux.x64-21.9.0.0.0dbru.zip
```

*2. set path to env*
```
export PATH=/opt/oracle/instantclient_21_9:$PATH
export LD_LIBRARY_PATH=/opt/oracle/instantclient_21_9:$LD_LIBRARY_PATH
```

*--- bash ver ---*
> you can confirm bash or zsh  
```
echo $0
```

> path env to permanent  
```
touch ~/.bash_profile
nano ~/.bash_profile
```
> and then write paths in .bash_profile  
```
export PATH=/opt/oracle/instantclient_21_9:$PATH
export LD_LIBRARY_PATH=/opt/oracle/instantclient_21_9:$LD_LIBRARY_PATH
```

*--- zsh ver ---*  
```
nano ~/.zshrc
```
> and then write paths in .zshrc  
```
export PATH=/opt/oracle/instantclient_21_9:$PATH
export LD_LIBRARY_PATH=/opt/oracle/instantclient_21_9:$LD_LIBRARY_PATH
```

*3. install libaio and set conf*
```
sudo apt-get install libaio1

sudo sh -c "echo /opt/oracle/instantclient_21_9 > /etc/ld.so.conf.d/oracle-instantclient.conf"
sudo ldconfig
```

*4. Check if sqlplus is functioning correctly*
```  
sqlplus
```