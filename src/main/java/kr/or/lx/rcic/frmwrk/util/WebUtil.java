package kr.or.lx.rcic.frmwrk.util;

import kr.or.lx.rcic.frmwrk.web.NoParamListException;
import net.sf.json.JSONArray;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class WebUtil {

    /**
     * commonAjax의 파라미터를 반환한다.
     * @param defaultListCnt 페이징 카운트(default: 10)
     * @param isNullSafe null-safe 여부, false이고 파라미터 없으면 NoParamException 발생
     * @return
     * @throws Exception
     */
    public static Map<String, Object> getCommonAjaxParam(int defaultListCnt, boolean isNullSafe) throws Exception {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        Map<String, Object> resultMap = new HashMap<String, Object>();

        resultMap.put("message", "success");
        String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
        if (strParamList.equals("") && isNullSafe == false) {
            throw new NoParamListException();
        } else if (strParamList.equals("") && isNullSafe == true) {
            strParamList = "[{}]";
        }

        JSONArray paramList = JSONArray.fromObject(strParamList);
        Map<String, Object> param = new HashMap<String, Object>();
        param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0), ""));

        int listCnt = param.get("listCnt") == null ? defaultListCnt : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int currPage = param.get("currPage") == null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));

        param.put("listCnt", listCnt);
        param.put("currPage", currPage);
        return param;
    }

    /**
     * commonAjax의 파라미터 반환
     * @return
     * @throws Exception
     */
    public static Map<String, Object> getCommonAjaxParam() throws Exception {
        return getCommonAjaxParam(10, false);
    }

    /**
     * getCommonAjaxParam()의 null-safe 함수
     * @return
     * @throws Exception
     */
    public static Map<String, Object> getCommonAjaxParamIfPresent() throws Exception {
        return getCommonAjaxParam(10, true);
    }


}
