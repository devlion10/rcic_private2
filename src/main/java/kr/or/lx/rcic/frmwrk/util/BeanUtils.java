package kr.or.lx.rcic.frmwrk.util;

import lombok.experimental.UtilityClass;
import org.springframework.context.ApplicationContext;

@UtilityClass
public class BeanUtils {
public static <T> T getBean(Class<T> classType) {
	ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
	return applicationContext.getBean(classType);
	}

	public static Object getBean(String beanName) {
	    ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
	    return applicationContext.getBean(beanName);
	}
}

