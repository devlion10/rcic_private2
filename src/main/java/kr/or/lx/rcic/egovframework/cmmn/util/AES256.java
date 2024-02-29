package kr.or.lx.rcic.egovframework.cmmn.util;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

public class AES256 {
    public static final String secretKey= "bea3dfaad34577329dc175aa04ba5308c180820bfa1b24b9ca9e2228014433df";

    private static AES256 aes256 = null;
    public static AES256 getInstance(){
        if(aes256==null){
            synchronized(AES256.class){
                if(aes256==null)
                    aes256=new AES256();
                }
            }
        return aes256;
    }
    /**
     * 대칭키 생성을 한다. 시스템 최초 기동에서 대칭키 생성은 단지 한번만 되어야 하며 이 키는 절대 분실하면 안된다.
     * 만약 분실하게 된다면 이미 암호화 되어있는 데이터는 복구할 수 없게 된다. 이 메쏘드 실행 시마다 키값은 각각 다 다르게 나온다.
     * 한번 실행하여 발생한 키 정보는 DB 혹은 .
     * 사용자가 DB 에 존재하지 않으면 마찬가지로 false를 리턴한다.
     * @param con DB에 열린 Connection
     * @param login 사용자 ID
     * @param password 사용자 패스워드
     * @return 인증된 사용자는 true 값을 return. 그 외의 모든 경우는 false를 리턴한다.
     * @throws SQLException If the database is inconsistent or unavailable (
     *           (Two users with the same login, salt or digested password altered etc.)
     * @throws NoSuchAlgorithmException If the algorithm SHA-1 is not supported by the JVM
     */
     private String getSecretKeyHexString(){
         // 1. 256 비트 비밀키 생성
         SecretKey skey = null;
         KeyGenerator kgen;
         try {
             kgen = KeyGenerator.getInstance("AES");
             kgen.init(256);
             skey = kgen.generateKey();
         } catch (NoSuchAlgorithmException ex) {
             //Logger.getLogger(AES256.class.getName()).log(Level.SEVERE, null, ex);
         }
         // 2. 비밀 키를 이렇게 저장하여 사용하면 암호화/복호화가 편해진다.
         return StringUtils.byteToHex(skey.getEncoded());
     }

     private SecretKeySpec getSecretKeySpec(){
         byte[] encodedSecretKey = null;
         SecretKeySpec skeySpec = null;
         try {
             encodedSecretKey = Hex.decodeHex(secretKey.toCharArray());
             skeySpec = new SecretKeySpec(encodedSecretKey, "AES");
         } catch (DecoderException ex) {

         }
         return skeySpec;
     }


     public String encrypt(String str) {
         try{
             SecretKeySpec skeySpec = getSecretKeySpec();
             Cipher cipher = Cipher.getInstance("AES");
             cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
             byte[] encrypted = cipher.doFinal(str.getBytes());
             return StringUtils.byteToHex(encrypted);
         }catch(NoSuchAlgorithmException e){
         }catch(NoSuchPaddingException e){
         }catch(InvalidKeyException e){
         }catch(IllegalBlockSizeException e){
         }catch(BadPaddingException e){
         }
         return null;
     }

     public String decrypt(String encryptedHexStr) {
         String originalString = null;
         try {
             SecretKeySpec skeySpec = getSecretKeySpec();
             Cipher cipher = Cipher.getInstance("AES");
             cipher.init(Cipher.DECRYPT_MODE, skeySpec);
             byte[] encrypted = Hex.decodeHex(encryptedHexStr.toCharArray());
             byte[] original = cipher.doFinal(encrypted);
             originalString = new String(original);
         } catch (IllegalBlockSizeException ex) {
         } catch (BadPaddingException ex) {
         } catch (DecoderException ex) {
         } catch (InvalidKeyException ex) {
         } catch (NoSuchAlgorithmException ex) {
         } catch (NoSuchPaddingException ex) {
         }
         return originalString;
     }

     public static void main(String args[]){

         String company_name = "010-1234-5678";

         // 암호화 테스트 수행
         String encryptString = AES256.getInstance().encrypt(company_name);
         System.out.println("Original string: " + company_name + " Encrypted: " + encryptString);

         // 복호화 ㄷ테스트 수행
         String decryptString = AES256.getInstance().decrypt(encryptString);
         System.out.println("Encrypted string: " + encryptString + " Decrypted: " + decryptString);
     }
}
