from re import findall
import os

DEFAULT_MAX_PING = 1


def ping(ip):
    current_attempt = 0
    while current_attempt < DEFAULT_MAX_PING:
        #print(f"Pinging {ip} attempt {current_attempt}")
        result = os.popen(f'ping {ip} -c 1 -W 100').read()
        test_result = findall(r'\d\d bytes from ((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}: icmp_seq=\d+\sttl=\d+ '
                              r'time=\d+\.\d+ ms', result)
        if test_result:
            return True
        else:
            current_attempt += 1
    return False


if __name__ == "__main__":
    print(ping("10.1.1.1"))
