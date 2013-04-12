package yyz.cf.grsp.util;

public class StringUtil {

    /**
     * support Integer format:<br>
     * "33" "003300" "+33" " -0000 "
     * @param str String
     * @return boolean
     * -----http://www.hartech.cn/blog/blogview.asp?logID=73 
     */
   public static boolean isInteger(String str) {
       int begin = 0;
       if (str == null || str.trim().equals("")) {
           return false;
       }
       str = str.trim();
       if (str.startsWith("+") || str.startsWith("-")) {
           if (str.length() == 1) {
               // "+" "-"
               return false;
           }
           begin = 1;
       }
       for (int i = begin; i < str.length(); i++) {
           if (!Character.isDigit(str.charAt(i))) {
               return false;
           }
       }
       return true;
   }

}
