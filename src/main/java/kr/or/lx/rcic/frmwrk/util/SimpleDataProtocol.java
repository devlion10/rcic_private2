package kr.or.lx.rcic.frmwrk.util;

import java.util.LinkedHashMap;
import java.util.Map;

@SuppressWarnings({ "serial", "unchecked" })
public class SimpleDataProtocol extends LinkedHashMap
{

    public SimpleDataProtocol(int arg0, float arg1)
    {
        super(arg0, arg1);
        name = null;
        nullToInitialize = false;
    }

    public SimpleDataProtocol(int arg0)
    {
        super(arg0);
        name = null;
        nullToInitialize = false;
    }

    public SimpleDataProtocol()
    {
        name = null;
        nullToInitialize = false;
    }

    public SimpleDataProtocol(Map arg0)
    {
        super(arg0);
        name = null;
        nullToInitialize = false;
    }

    public SimpleDataProtocol(int arg0, float arg1, boolean arg2)
    {
        super(arg0, arg1, arg2);
        name = null;
        nullToInitialize = false;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public boolean isNullToInitialize()
    {
        return nullToInitialize;
    }

    public void setNullToInitialize(boolean nullToInitialize)
    {
        this.nullToInitialize = nullToInitialize;
    }

    protected String name;
    protected boolean nullToInitialize;
}